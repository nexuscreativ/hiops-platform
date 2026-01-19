"use client"

import { signOut, useSession } from "next-auth/react"
import { LogOut, User, Shield, LayoutDashboard } from "lucide-react"
import Link from "next/link"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function UserAccount() {
    const { data: session } = useSession()

    if (!session) return null

    const user = session.user as any
    const isAdmin = user.role === "SUPER_ADMIN" || user.role === "ADMIN"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                    <User className="h-5 w-5 text-slate-600" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 p-2">
                        <p className="text-sm font-black leading-none text-[#046379]">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                            <Shield className="h-3 w-3 text-[#01A651]" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#01A651]">{user.role}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                        <Link href="/console/brain" className="flex items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Command Console
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem
                    className="text-red-600 focus:bg-red-50 focus:text-red-700 rounded-xl cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
