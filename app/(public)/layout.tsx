import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

interface PublicLayoutProps {
    children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    )
}
