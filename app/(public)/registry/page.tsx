import Link from "next/link"
import { Users, ChevronRight, Fingerprint, ShieldCheck, UserCheck, Search } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function RegistryPublicPage() {
    return (
        <div className="flex flex-col bg-slate-50 min-h-screen">
            <section className="container py-12 md:py-24 lg:py-32">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-2xl bg-[#01A651]/10 p-4 mb-4">
                        <Users className="h-12 w-12 text-[#01A651]" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-6xl text-slate-900">
                        United National <br />
                        <span className="text-[#01A651]">Social Registry.</span>
                    </h1>
                    <p className="max-w-[700px] text-xl text-slate-600 md:text-2xl/relaxed">
                        A single-source-of-truth for beneficiary management. Built on biometric integrity
                        to ensure every Naira reaches the hands of verified Nigerians.
                    </p>
                    <div className="flex gap-4 mt-8">
                        <Link
                            href="/login?callbackUrl=/console/registry"
                            className={buttonVariants({ size: "lg", className: "bg-primary hover:bg-primary/90 text-white px-8 rounded-2xl font-bold" })}
                        >
                            Open Registry Dashboard
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 border-y border-slate-100">
                <div className="container grid md:grid-cols-3 gap-8">
                    <Card className="border-0 shadow-none bg-slate-50/50 rounded-[2rem] p-4 text-center">
                        <CardHeader className="flex flex-col items-center">
                            <Fingerprint className="h-8 w-8 text-[#046379] mb-2" />
                            <CardTitle className="text-xl font-bold">Biometric Integrity</CardTitle>
                            <CardDescription>
                                Zero-leakage verification system utilizing vNIN and biometric scanning
                                to eliminate ghost beneficiaries.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="border-0 shadow-none bg-slate-50/50 rounded-[2rem] p-4 text-center">
                        <CardHeader className="flex flex-col items-center">
                            <ShieldCheck className="h-8 w-8 text-[#01A651] mb-2" />
                            <CardTitle className="text-xl font-bold">Deduplication Engine</CardTitle>
                            <CardDescription>
                                Advanced orchestration logic that prevents multiple Enrollments across
                                different agencies and programs.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="border-0 shadow-none bg-slate-50/50 rounded-[2rem] p-4 text-center">
                        <CardHeader className="flex flex-col items-center">
                            <Search className="h-8 w-8 text-amber-500 mb-2" />
                            <CardTitle className="text-xl font-bold">Transparent Audit</CardTitle>
                            <CardDescription>
                                Every record update is immutable and logged, providing a clear audit
                                trail for international partners and government.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            <section className="container py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-slate-900">Dignity Through <br />Design.</h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            The Registry isn't just a database; it's a testament to our commitment
                            to treating every vulnerable citizen with compassion. By ensuring
                            data accuracy, we ensure no one is left behind.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Real-time enrollment tracking",
                                "Ministerial-grade data encryption",
                                "Offline-capable biometric sync",
                                "Multi-agency coordination"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                                    <UserCheck className="h-5 w-5 text-[#01A651]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-[#01A651]/10 rounded-[3rem] blur-2xl group-hover:bg-[#01A651]/20 transition-all"></div>
                        <div className="relative bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-2xl">
                            <div className="space-y-6">
                                <div className="h-4 bg-slate-50 rounded-full w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-slate-50 rounded-full w-full animate-pulse delay-75"></div>
                                <div className="h-4 bg-slate-50 rounded-full w-2/3 animate-pulse delay-150"></div>
                                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <div className="h-10 w-10 rounded-xl bg-[#01A651]/10"></div>
                                    <div className="h-8 w-32 rounded-lg bg-[#046379]/10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
