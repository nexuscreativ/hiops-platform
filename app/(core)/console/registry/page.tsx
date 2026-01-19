"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
    CheckCircle2,
    Filter,
    Fingerprint,
    MoreHorizontal,
    Search,
    ShieldCheck,
    UserCheck,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function RegistryPage() {
    const [beneficiaries, setBeneficiaries] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const res = await fetch("/api/beneficiaries")
                if (res.ok) {
                    const data = await res.json()
                    setBeneficiaries(data)
                }
            } catch (error) {
                console.error("Failed to fetch registry", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchBeneficiaries()
    }, [])

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Unified Social Registry</h2>
                    <p className="text-muted-foreground">
                        A single-source-of-truth for national beneficiary verification and social protection orchestration.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" /> Filter
                    </Button>
                    <Button className="bg-[#046379] hover:bg-[#035264] gap-2 text-white">
                        <Fingerprint className="h-4 w-4" /> New Biometric Scan
                    </Button>
                </div>
            </div>

            {/* Metrics Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Verified</CardTitle>
                        <UserCheck className="h-4 w-4 text-[#01A651]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{beneficiaries.length.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Live Count</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Registry Fidelity</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-[#046379]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.8%</div>
                        <p className="text-xs text-muted-foreground">0.2% deduplication rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Programs</CardTitle>
                        <Users className="h-4 w-4 text-[#046379]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">Across 36 States + FCT</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Anomaly Blocked</CardTitle>
                        <Fingerprint className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4,281</div>
                        <p className="text-xs text-muted-foreground">Ghost patterns identified</p>
                    </CardContent>
                </Card>
            </div>

            {/* Registry Table Section */}
            <Card className="shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Beneficiary Records</CardTitle>
                            <CardDescription>Managing national data with transparency and accountability.</CardDescription>
                        </div>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                placeholder="Search vNIN, Name..."
                                className="flex h-9 w-full rounded-md border border-input bg-background px-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b">
                                    <th className="p-4 text-left font-semibold">ID</th>
                                    <th className="p-4 text-left font-semibold">Name</th>
                                    <th className="p-4 text-left font-semibold">Location</th>
                                    <th className="p-4 text-left font-semibold">Program</th>
                                    <th className="p-4 text-left font-semibold">Status</th>
                                    <th className="p-4 text-left font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {beneficiaries.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                            {isLoading ? "Loading Registry..." : "No beneficiaries found."}
                                        </td>
                                    </tr>
                                ) : (
                                    beneficiaries.map((row) => (
                                        <tr key={row.id} className="border-b transition-colors hover:bg-slate-50/50">
                                            <td className="p-4 font-mono font-medium">{row.id}</td>
                                            <td className="p-4 font-semibold">{row.firstName} {row.lastName}</td>
                                            <td className="p-4 text-muted-foreground">{row.lga}</td>
                                            <td className="p-4">
                                                {row.enrollments && row.enrollments.length > 0
                                                    ? row.enrollments[0].program?.name || "Active"
                                                    : "Unenrolled"}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${row.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                                        row.status === 'flagged' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {row.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <div className="rounded-xl border bg-[#046379]/5 p-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4 text-[#046379]">
                    <div className="p-3 rounded-full bg-white shadow-sm">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold">Transparency Multi-Sig Audit</h4>
                        <p className="text-sm opacity-80">Encryption keys managed by 3 international partner agencies.</p>
                    </div>
                </div>
                <Button className="bg-[#046379] hover:bg-[#035264] text-white">Download Public Audit Report</Button>
            </div>
        </div>
    )
}
