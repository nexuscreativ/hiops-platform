"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"

import {
    Activity,
    AlertTriangle,
    Apple,
    ArrowRight,
    Bell,
    CheckCircle2,
    ChevronRight,
    Database,
    Download,
    Fingerprint,
    Home,
    LayoutGrid,
    MapPin,
    Play,
    Plus,
    Settings,
    ShieldCheck,
    Smartphone,
    Users,
    Waves,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ActionButton = ({ icon: Icon, label, color, description }: { icon: any; label: string; color: string; description: string }) => (
    <button className="flex flex-col items-center gap-3 group text-center">
        <div className={`p-6 rounded-[2rem] ${color} text-white shadow-lg transition-all group-hover:shadow-xl group-hover:-translate-y-1 group-active:scale-95`}>
            <Icon className="h-10 w-10" />
        </div>
        <div className="space-y-1">
            <span className="text-sm font-bold text-slate-900 block">{label}</span>
            <span className="text-[10px] text-slate-500 font-medium px-2 leading-tight block">{description}</span>
        </div>
    </button>
)

export default function FieldLinkPage() {
    const [stats, setStats] = useState<any>(null)

    useEffect(() => {
        fetch("/api/stats")
            .then(res => res.json())
            .then(data => setStats(data))
    }, [])

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            {/* Split Hero Section */}
            <section className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-20 lg:py-28">
                <div className="flex flex-col items-start gap-6">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-700 tracking-wide uppercase">
                        Last-Mile Humanitarian Delivery
                    </span>
                    <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl text-slate-900">
                        Operational Window into <span className="text-primary">The Last Mile.</span>
                    </h1>
                    <p className="max-w-[540px] text-xl text-slate-600 leading-relaxed">
                        FieldLink is the mobile extension of HIOPS, designed for humanitarian agents operating in
                        shocks and remote clusters. Built for offline resilience, biometric integrity, and
                        proactive community engagement.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                        <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold gap-3 shadow-xl">
                            <Plus className="h-5 w-5" />
                            Add to Home Screen
                        </Button>
                        <Link href="/agent-login">
                            <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 text-primary font-black gap-2 shadow-sm hover:bg-slate-50">
                                Field Agent Access
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-8 border-t border-slate-200 pt-8 w-full">
                        <div>
                            <p className="text-3xl font-black text-primary">Zero-Install</p>
                            <p className="text-sm font-medium text-slate-500">No App Store downloads required.</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-[#01A651]">Biometric</p>
                            <p className="text-sm font-medium text-slate-500">Zero-leakage identity verification.</p>
                        </div>
                    </div>
                </div>

                {/* Mobile Preview with Frame */}
                <div className="relative flex justify-center lg:justify-end">
                    {/* Background Decorative Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-slate-200/50 -z-10 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full border border-slate-100/50 -z-20"></div>

                    <div className="relative h-[720px] w-[360px] overflow-hidden rounded-[3.5rem] border-[12px] border-slate-900 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
                        {/* Status Bar */}
                        <div className="absolute top-0 h-8 w-full bg-slate-900 flex items-center justify-between px-10 pt-2">
                            <span className="text-[10px] text-white font-bold">12:45</span>
                            <div className="h-4 w-20 rounded-full bg-slate-800"></div>
                            <div className="flex gap-1">
                                <Waves className="h-3 w-3 text-white" />
                                <div className="h-3 w-5 bg-white/20 rounded-sm"></div>
                            </div>
                        </div>

                        {/* App Content */}
                        <div className="flex h-full flex-col pt-10">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 p-2.5 flex items-center justify-center">
                                        <Users className="h-7 w-7 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Verified Agent</p>
                                        <p className="text-md font-black text-slate-900">Usman Bello</p>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center relative">
                                    <Bell className="h-5 w-5 text-slate-400" />
                                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#01A651] border-2 border-white"></div>
                                </div>
                            </div>

                            {/* Operational Status Card */}
                            <div className="px-6 pb-6">
                                <Card className="bg-primary text-white border-0 shadow-lg rounded-[2rem] overflow-hidden relative">
                                    <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                                                <Smartphone className="h-5 w-5" />
                                            </div>
                                            <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full uppercase">Cluster: Kano-Central</span>
                                        </div>
                                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Sync Status</p>
                                        <h3 className="text-3xl font-black mt-1">{stats?.beneficiaries?.pending || "34"} <span className="text-xl opacity-60">Pending</span></h3>
                                        <div className="mt-4 flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full w-2/3 bg-[#01A651] rounded-full"></div>
                                            </div>
                                            <span className="text-[10px] font-bold">{stats?.interventions?.successRate || "65%"} Synced</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Core Operational Actions */}
                            <div className="flex-1 px-6 grid grid-cols-2 gap-6 content-center">
                                <ActionButton
                                    icon={Fingerprint}
                                    label="Onboarding"
                                    color="bg-[#01A651]"
                                    description="Biometric Registry"
                                />
                                <ActionButton
                                    icon={Activity}
                                    label="Assessment"
                                    color="bg-[#046379]"
                                    description="Disaster Audit"
                                />
                                <ActionButton
                                    icon={ShieldCheck}
                                    label="E-Wallet"
                                    color="bg-amber-500"
                                    description="Grant Distribution"
                                />
                                <ActionButton
                                    icon={LayoutGrid}
                                    label="Inventory"
                                    color="bg-indigo-600"
                                    description="Resource Tracking"
                                />
                            </div>

                            {/* Bottom Tab Bar */}
                            <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center rounded-t-[3rem]">
                                <Home className="h-6 w-6 text-[#046379]" />
                                <div className="h-14 w-14 rounded-full bg-slate-900 border-[6px] border-white -mt-12 flex items-center justify-center shadow-xl">
                                    <Plus className="h-6 w-6 text-white" />
                                </div>
                                <Settings className="h-6 w-6 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Operational Vision Section */}
            <section className="bg-white py-24 border-t border-slate-100">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Institutional Ground Reality</h2>
                        <p className="text-lg text-slate-600">FieldLink bridge the gap between ministerial policy and field implementation through three core pillars.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#01A651]">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Absolute Accountability</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                By mandating biometric verification for every distribution, FieldLink ensures that
                                every Naira reaches a verified individual, eliminating leakage and ghost beneficiaries.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-[#046379]">
                                <Waves className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Resilience Against Shocks</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                FieldLink maintains full functionality in areas with zero connectivity. Data is stored
                                locally using ministerial-grade encryption and synced automatically when back in range.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Rapid Crisis Assessment</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                During disasters, agents can instantly perform vulnerability audits. This real-time
                                data feeds directly into "The Brain" to trigger automated response pathways.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-[#046379] py-20 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-10 left-10 h-64 w-64 border-4 border-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 h-96 w-96 border-4 border-white rounded-full"></div>
                </div>
                <div className="container text-center relative z-10">
                    <h2 className="text-4xl font-black mb-6">Ready to Empower Nigeria?</h2>
                    <p className="max-w-xl mx-auto text-white/70 mb-10">
                        Join the network of verified humanitarian agents using HIOPS to bring dignity
                        and support to every household in need.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/agent-login">
                            <Button className="bg-white text-primary hover:bg-white/90 h-14 px-10 rounded-2xl font-black gap-2">
                                Registered Agent Login
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/intelligence">
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-10 rounded-2xl font-bold">
                                View Deployment Map
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
