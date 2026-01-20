"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle, ChevronRight, Lock, Loader2, Landmark } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Suspense } from "react"

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/console/brain"

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            setError("Invalid administrative credentials. Please verify and try again.")
            setIsLoading(false)
        } else {
            router.push(callbackUrl)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-lg overflow-hidden border-0 shadow-2xl rounded-3xl">
                <div className="grid lg:grid-cols-2">
                    <div className="bg-[#046379] p-8 text-white flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                                <Landmark className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-black leading-tight">Institutional <br />Control Center</h2>
                            <p className="text-white/60 text-sm">
                                Authorized personnel only. This portal manages national social protection data.
                            </p>
                        </div>
                        <div className="text-[10px] font-mono text-white/40 mt-12 bg-black/20 p-3 rounded-lg border border-white/5">
                            SECURE_V4.2 // MINISTERIAL_GRADE_ENCRYPTION
                        </div>
                    </div>
                    <CardContent className="p-8 bg-white">
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-xl font-bold text-slate-900 text-center">Admin Sign In</CardTitle>
                            <CardDescription className="text-center">Enter your ministerial credentials</CardDescription>
                        </CardHeader>
                        <form onSubmit={onSubmit} className="space-y-5">
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-100">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email">Work Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@hio.gov.ng"
                                    className="h-11 rounded-xl"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Security Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-11 rounded-xl pl-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="bg-[#046379] hover:bg-[#035264] h-11 w-full rounded-xl text-md font-bold transition-all shadow-lg shadow-[#046379]/20"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        Verify & Enter
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                        <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-2">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                National Resilience Grid
                            </p>
                            <Link href="/agent-login" className="text-xs text-[#046379] hover:underline block">
                                Field Agent? Switch to PIN Access
                            </Link>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="h-8 w-8 animate-spin text-[#046379]" /></div>}>
            <LoginContent />
        </Suspense>
    )
}
