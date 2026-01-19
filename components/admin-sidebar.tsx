"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Brain,
    Users,
    Settings,
    GraduationCap,
    Briefcase,
    Database,
    Fingerprint,
    LayoutDashboard,
    Cpu,
    BookOpen
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigations = [
    { name: "Orchestration Brain", href: "/console/brain", icon: Brain },
    { name: "Unified Registry", href: "/console/registry", icon: Fingerprint },
    { name: "Programs & Grants", href: "/console/programs", icon: LayoutDashboard },
    { name: "Institution Setup", href: "/console/cms", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 border-r bg-white flex flex-col min-h-[calc(100vh-64px)] shadow-sm">
            <div className="p-4 border-b">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Institutional Console</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Admin Control Room</p>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navigations.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                                isActive
                                    ? "bg-[#046379] text-white shadow-lg shadow-[#046379]/20"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-[#046379]"
                            )}
                        >
                            <item.icon className={cn(
                                "h-5 w-5 transition-transform group-hover:scale-110",
                                isActive ? "text-white" : "text-slate-400"
                            )} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t bg-slate-50/50">
                <div className="rounded-2xl bg-[#01A651]/10 p-3 border border-[#01A651]/20">
                    <p className="text-[10px] font-black text-[#01A651] uppercase tracking-wider">System Integrity</p>
                    <p className="text-[10px] text-[#01A651]/70 mt-1 leading-tight font-medium">Data verified via 256-bit ministerial keys.</p>
                </div>
            </div>
        </div>
    )
}
