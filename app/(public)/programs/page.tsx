import Link from "next/link"
import { Layers, ChevronRight, Activity, Users, Plus, Zap } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ProgramsPublicPage() {
    return (
        <div className="flex flex-col bg-slate-50 min-h-screen">
            <section className="container py-12 md:py-24 lg:py-32">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-2xl bg-indigo-100 p-4 mb-4">
                        <Layers className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-6xl text-slate-900">
                        National Resilience <br />
                        <span className="text-indigo-600">Intervention Pathways.</span>
                    </h1>
                    <p className="max-w-[700px] text-xl text-slate-600 md:text-2xl/relaxed">
                        Orchestrating social protection programs at scale. From Cash Transfers to
                        Skills Training, HIOPS automates the flow of support to verified clusters.
                    </p>
                    <div className="flex gap-4 mt-8">
                        <Link
                            href="/login?callbackUrl=/console/programs"
                            className={buttonVariants({ size: "lg", className: "bg-primary hover:bg-primary/90 text-white px-8 rounded-2xl font-bold" })}
                        >
                            Orchestrate Programs
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 border-y border-slate-100">
                <div className="container">
                    <h2 className="text-3xl font-black text-center mb-12">Core Intervention Modules</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-0 shadow-none bg-slate-50/50 rounded-[2rem] p-6">
                            <CardHeader>
                                <Activity className="h-10 w-10 text-emerald-600 mb-4" />
                                <CardTitle className="text-2xl font-bold">Unconditional CVA</CardTitle>
                                <CardDescription className="text-md">
                                    Direct Cash and Voucher Assistance automated through digital wallets
                                    and biometric verification.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-0 shadow-none bg-slate-50/50 rounded-[2rem] p-6">
                            <CardHeader>
                                <Users className="h-10 w-10 text-blue-600 mb-4" />
                                <CardTitle className="text-2xl font-bold">Livelihood Support</CardTitle>
                                <CardDescription className="text-md">
                                    Skills acquisition and entrepreneurship training pathways for long-term
                                    economic resilience.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-0 shadow-none bg-slate-50/50 rounded-[2rem] p-6">
                            <CardHeader>
                                <Plus className="h-10 w-10 text-amber-600 mb-4" />
                                <CardTitle className="text-2xl font-bold">Emergency Relief</CardTitle>
                                <CardDescription className="text-md">
                                    Rapid deployment protocols for disaster-affected areas, triggered by
                                    Intelligence shock signals.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="container py-24">
                <div className="flex flex-col items-center gap-8 text-center bg-indigo-600 rounded-[3rem] p-16 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <Zap className="h-[400px] w-[400px] absolute -top-20 -left-20 rotate-12" />
                    </div>
                    <h2 className="text-4xl font-black relative z-10">Automating Impact.</h2>
                    <p className="max-w-2xl text-indigo-100 text-lg relative z-10 leading-relaxed">
                        By integrating with the Unified Registry, HIOPS Programs eliminate the manual
                        overhead of targeting, allowing ministerial staff to focus on strategic
                        oversight and policy impact.
                    </p>
                    <Link href="/docs" className="relative z-10 font-bold underline underline-offset-4 hover:text-indigo-200">
                        Download Intervention Strategy Whitepaper
                    </Link>
                </div>
            </section>
        </div>
    )
}
