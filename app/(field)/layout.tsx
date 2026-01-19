import { OfflineProvider } from "@/components/providers/offline-provider"

interface FieldLayoutProps {
    children: React.ReactNode
}

export default function FieldLayout({ children }: FieldLayoutProps) {
    return (
        <OfflineProvider>
            <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
                <main className="h-full w-full max-w-md mx-auto min-h-screen shadow-2xl bg-white dark:bg-slate-950 overflow-hidden relative">
                    {children}
                </main>
            </div>
        </OfflineProvider>
    )
}

