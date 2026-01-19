import { SiteHeader } from "@/components/site-header"

interface CoreLayoutProps {
    children: React.ReactNode
}

export default function CoreLayout({ children }: CoreLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
            <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-slate-950 shadow-sm">
                <SiteHeader />
            </header>
            <main className="flex-1">{children}</main>
        </div>
    )
}
