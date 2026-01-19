import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function CustomDynamicPage({ params }: PageProps) {
    const { slug } = await params
    const page = await prisma.customPage.findUnique({
        where: {
            slug,
            published: true
        }
    })

    if (!page) {
        notFound()
    }

    // Simple renderer for JSON blocks (placeholder for phase 2)
    const content = page.content as any
    const blocks = content.blocks || []

    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#046379]">
                        {page.title}
                    </h1>
                    <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full" />
                </div>

                <div className="prose prose-slate max-w-none">
                    {blocks.length === 0 ? (
                        <p className="text-slate-500 italic text-center">This page currently has no official content blocks.</p>
                    ) : (
                        blocks.map((block: any, idx: number) => {
                            if (block.type === "text") {
                                return <p key={idx}>{block.value}</p>
                            }
                            if (block.type === "heading") {
                                return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{block.value}</h2>
                            }
                            return null
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
