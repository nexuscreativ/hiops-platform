"use client"

import { useState } from "react"
import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, Camera, Loader2, Save, WifiOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast" // We might need to check if this exists or create it

// Mock function to simulate API call (which will fail offline)
const registerBeneficiary = async (data: any) => {
    // In a real scenario, this would POST to /api/beneficiaries
    // For offline-first, we rely on the mutation cache or a specific "sync queue" pattern
    // Here we just simulate a success so `persist-client` can cache the mutation if configured
    // OR we explicitly throw if offline to trigger retry logic?
    // Actually, networkMode: 'offlineFirst' means it will fire the mutation.

    // For this MVP, we will simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return data
}

export default function OnboardingPage() {
    // const { toast } = useToast() // Checking if we have toast
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        lga: "",
        community: "",
    })

    const mutation = useMutation({
        mutationFn: registerBeneficiary,
        mutationKey: ["registerBeneficiary"],
        onSuccess: () => {
            // In offline mode, this might fire immediately if we mock success, or wait till online
            // We need to visually indicate "Saved to Device"
            alert("Beneficiary Saved to Device (Sync Pending)")
            setFormData({
                firstName: "",
                lastName: "",
                gender: "",
                dob: "",
                lga: "",
                community: "",
            })
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate(formData)
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-[#046379] px-6 pt-8 pb-12 text-white rounded-b-[2rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="relative z-10 flex items-center gap-4 mb-4">
                    <Link href="/agent">
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full text-white hover:bg-white/20">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <span className="text-lg font-bold">New Beneficiary</span>
                </div>
                <h1 className="text-3xl font-black mb-2">Onboarding</h1>
                <p className="text-white/80 text-sm">Capture details securely. Data will sync automatically.</p>
            </div>

            <div className="px-6 -mt-8 relative z-20">
                <Card className="border-0 shadow-lg rounded-[2rem] overflow-hidden">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3 text-amber-800 mb-6">
                                <WifiOff className="h-5 w-5" />
                                <span className="text-xs font-bold">Offline Mode Active. Data saves locally.</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="Musa"
                                        className="h-12 rounded-xl"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Aliyu"
                                        className="h-12 rounded-xl"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Biometric Capture (Face)</Label>
                                <div className="h-32 w-full rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-2 hover:bg-slate-200 transition-colors cursor-pointer">
                                    <Camera className="h-8 w-8" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Tap to Capture</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                                    <SelectTrigger className="h-12 rounded-xl">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lga">LGA</Label>
                                <Input
                                    id="lga"
                                    placeholder="Kano Municipal"
                                    className="h-12 rounded-xl"
                                    value={formData.lga}
                                    onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-2xl bg-[#01A651] hover:bg-[#018e45] text-white font-bold text-lg shadow-xl shadow-green-200 mt-4"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-5 w-5" />
                                        Save Record
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
