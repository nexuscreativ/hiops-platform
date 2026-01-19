import { CmsNav } from "@/components/cms-nav"

export default function CmsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-6">
            <CmsNav />
            {children}
        </div>
    )
}
