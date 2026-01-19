"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Brain, ChevronRight, Activity, Zap, Layers, Map } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DeploymentMap } from "@/components/deployment-map"

export default function IntelligencePublicPage() {
    const [stats, setStats] = useState<any>(null)

    useEffect(() => {
        fetch("/api/stats")
            .then(res => res.json())
            .then(data => setStats(data))
    }, [])

    return (
        <div className="flex flex-col bg-slate-50 min-h-screen">
            <section className="container py-12 md:py-24 lg:py-32">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-2xl bg-primary/10 p-4 mb-4">
                        <Brain className="h-12 w-12 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-6xl text-slate-900">
                        The Institutional <br />
                        <span className="text-primary">Orchestration Engine.</span>
                    </h1>
                    <p className="max-w-[700px] text-xl text-slate-600 md:text-2xl/relaxed">
                        Predictive intelligence for national resilience. "The Brain" integrates real-time data from
                        the field to automate humanitarian response and social safety net delivery.
                    </p>
                    <div className="flex gap-4 mt-8">
                        <Link
                            href="/login?callbackUrl=/console/brain"
                            className={buttonVariants({ size: "lg", className: "bg-primary hover:bg-primary/90 text-white px-8 rounded-2xl font-bold" })}
                        >
                            Access Command Console
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 border-y border-slate-100">
                <div className="container grid md:grid-cols-3 gap-8">
                    <Card className="border-0 shadow-none bg-slate-50/50 rounded-[2rem] p-4 text-center">
                        <CardHeader className="flex flex-col items-center">
                            <Activity className="h-8 w-8 text-[#01A651] mb-2" />
                            <CardTitle className="text-xl font-bold">Predictive Risk Mapping</CardTitle>
                            <CardDescription>
                                Identifying vulnerability hotspots before they become crises using regional
                                data aggregation and AI-driven analysis.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="border-0 shadow-none bg-slate-50/50 rounded-[2rem] p-4 text-center">
                        <CardHeader className="flex flex-col items-center">
                            <Zap className="h-8 w-8 text-amber-500 mb-2" />
                            <CardTitle className="text-xl font-bold">Automated Response</CardTitle>
                            <CardDescription>
                                Triggering intervention pathways instantly when shock thresholds are met,
                                ensuring aid flows to the last mile with zero lag.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="border-0 shadow-none bg-slate-50/50 rounded-[2rem] p-4 text-center">
                        <CardHeader className="flex flex-col items-center">
                            <Layers className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="text-xl font-bold">Resource Optimization</CardTitle>
                            <CardDescription>
                                Real-time oversight of national resource utilization to ensure optimal
                                allocation of funding and supplies.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            <section className="container py-24">
                <div className="bg-primary rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 h-96 w-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <h2 className="text-5xl font-black leading-tight tracking-tight">Data-Driven Governance.</h2>
                            <p className="text-white/70 text-lg max-w-lg leading-relaxed">
                                HIOPS Intelligence provides ministerial-level oversight into every aspect of
                                social protection, ensuring transparency, accountability, and impact.
                            </p>
                            <div className="flex justify-center lg:justify-start gap-12">
                                <div className="text-center">
                                    <p className="text-4xl font-black">{stats?.interventions?.successRate || "99.9%"}</p>
                                    <p className="text-[10px] text-white/50 uppercase font-extrabold tracking-[0.2em] mt-2">Data Integrity</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-black">{stats?.fieldOps?.activeClusters || "36"}</p>
                                    <p className="text-[10px] text-white/50 uppercase font-extrabold tracking-[0.2em] mt-2">Active Clusters</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full relative">
                            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-[3rem]"></div>
                            <DeploymentMap />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
