"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, Layout, Palette, FileText, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

const navigations = [
    { name: "General", href: "/console/cms", icon: Settings },
    { name: "Navigation", href: "/console/cms/navigation", icon: Layout },
    { name: "Themes", href: "/console/cms/theme", icon: Palette },
    { name: "Pages", href: "/console/cms/pages", icon: FileText },
    { name: "API Manager", href: "/console/cms/services", icon: Cpu },
]

export function CmsNav() {
    const pathname = usePathname()

    return (
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            {navigations.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                            isActive
                                ? "bg-[#046379] text-white shadow-md shadow-[#046379]/20"
                                : "text-slate-500 hover:bg-slate-50 hover:text-[#046379]"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                    </Link>
                )
            })}
        </div>
    )
}
