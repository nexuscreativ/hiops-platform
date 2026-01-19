"use client"

import Link from "next/link"

import {
    Activity,
    Bell,
    Fingerprint,
    Home,
    LayoutGrid,
    Plus,
    Settings,
    ShieldCheck,
    Smartphone,
    Users,
    Waves,
    LogOut,
    ArrowLeft,
} from "lucide-react"
import { signOut } from "next-auth/react"

import { Card, CardContent } from "@/components/ui/card"

const ActionButton = ({
    icon: Icon,
    label,
    color,
    description,
}: {
    icon: any
    label: string
    color: string
    description: string
}) => (
    <button className="flex flex-col items-center gap-3 group text-center w-full">
        <div
            className={`p-6 rounded-[2rem] ${color} text-white shadow-lg transition-all group-hover:shadow-xl group-hover:-translate-y-1 group-active:scale-95 w-full flex items-center justify-center aspect-square`}
        >
            <Icon className="h-8 w-8" />
        </div>
        <div className="space-y-1">
            <span className="text-sm font-bold text-slate-900 block leading-none">{label}</span>
            <span className="text-[10px] text-slate-500 font-medium leading-tight block">{description}</span>
        </div>
    </button>
)

export default function AgentDashboard() {
    return (
        <div className="flex h-full flex-col min-h-screen bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-8">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#046379]/10 p-2.5 flex items-center justify-center">
                        <Users className="h-7 w-7 text-[#046379]" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Verified Agent</p>
                        <p className="text-md font-black text-slate-900">Usman Bello</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                    <button className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center relative hover:bg-slate-50">
                        <Bell className="h-5 w-5 text-slate-400" />
                        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#01A651] border-2 border-white"></div>
                    </button>
                </div>
            </div>

            {/* Operational Status Card */}
            <div className="px-6 pb-6">
                <Card className="bg-[#046379] text-white border-0 shadow-lg rounded-[2rem] overflow-hidden relative">
                    <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                                <Smartphone className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full uppercase">
                                Cluster: Kano-Central
                            </span>
                        </div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Sync Status</p>
                        <h3 className="text-3xl font-black mt-1">
                            34 <span className="text-xl opacity-60">Pending</span>
                        </h3>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-[#01A651] rounded-full"></div>
                            </div>
                            <span className="text-[10px] font-bold">65% Synced</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Core Operational Actions */}
            <div className="flex-1 px-6 pb-24">
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                    <Link href="/agent/onboarding" className="w-full">
                        <ActionButton
                            icon={Fingerprint}
                            label="Onboarding"
                            color="bg-[#01A651]"
                            description="Biometric Registry"
                        />
                    </Link>
                    <ActionButton icon={Activity} label="Assessment" color="bg-[#046379]" description="Disaster Audit" />
                    <ActionButton icon={ShieldCheck} label="E-Wallet" color="bg-amber-500" description="Grant Distribution" />
                    <ActionButton icon={LayoutGrid} label="Inventory" color="bg-indigo-600" description="Resource Tracking" />
                </div>
            </div>

            {/* Bottom Tab Bar (Fixed) */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t border-slate-100 flex justify-between items-center rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <button className="p-2 text-[#046379]">
                    <Home className="h-6 w-6" />
                </button>
                <button className="h-14 w-14 rounded-full bg-slate-900 border-[6px] border-white -mt-12 flex items-center justify-center shadow-xl hover:bg-slate-800 transition-colors">
                    <Plus className="h-6 w-6 text-white" />
                </button>
                <Link href="/" className="p-2 text-slate-400 hover:text-[#046379] flex flex-col items-center">
                    <ArrowLeft className="h-6 w-6" />
                    <span className="text-[8px] font-bold uppercase mt-1">Platform</span>
                </Link>
            </div>
        </div>
    )
}
