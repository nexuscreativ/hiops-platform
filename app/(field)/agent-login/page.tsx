"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { AlertCircle, ChevronRight, Fingerprint, Loader2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AgentLoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [agentId, setAgentId] = useState("")
    const [pin, setPin] = useState("")
    const [error, setError] = useState("")

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const result = await signIn("credentials", {
            agentId,
            pin,
            redirect: false,
        })

        if (result?.error) {
            setError("Invalid credentials. Please verify your Agent ID and PIN.")
            setIsLoading(false)
        } else {
            router.push("/agent") // Redirect to dashboard
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md overflow-hidden rounded-[2rem] border-0 shadow-2xl">
                <div className="bg-[#046379] p-8 text-center text-white">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-black">FieldLink Access</CardTitle>
                    <CardDescription className="text-white/70">
                        Secure Authentication Gateway
                    </CardDescription>
                </div>
                <CardContent className="p-8">
                    <form onSubmit={onSubmit} className="space-y-6">
                        {error && (
                            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="agentId">Agent ID</Label>
                            <Input
                                id="agentId"
                                placeholder="AGT-0000"
                                className="h-12 rounded-xl text-lg"
                                value={agentId}
                                onChange={(e) => setAgentId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pin">Secure PIN</Label>
                            <div className="relative">
                                <Input
                                    id="pin"
                                    type="password"
                                    placeholder="••••"
                                    className="h-12 rounded-xl text-lg pl-12 tracking-widest"
                                    maxLength={4}
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    required
                                />
                                <Fingerprint className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="bg-[#046379] hover:bg-[#035264] h-12 w-full rounded-xl text-lg font-bold"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Authenticate
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>
                    <div className="mt-6 text-center space-y-4">
                        <Link href="/login" className="text-xs text-[#046379] font-bold hover:underline">
                            Institutional Personnel? Sign In Here
                        </Link>
                        <div className="text-xs text-slate-400">
                            <p>Restricted Access. All activity is logged.</p>
                            <p>Session ID: {new Date().getTime().toString(36).toUpperCase()}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
