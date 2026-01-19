import { AdminSidebar } from "@/components/admin-sidebar"

interface ConsoleLayoutProps {
    children: React.ReactNode
}

export default function ConsoleLayout({ children }: ConsoleLayoutProps) {
    return (
        <div className="flex bg-slate-50 min-h-[calc(100vh-64px)] overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-slate-50">
                {children}
            </main>
        </div>
    )
}
