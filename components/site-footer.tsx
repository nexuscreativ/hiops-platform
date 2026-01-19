import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export async function SiteFooter() {
    const settings = await prisma.siteSetting.findMany()
    const navItems = await prisma.navigationItem.findMany({
        orderBy: { order: "asc" }
    })

    const settingsMap = settings.reduce((acc: any, curr) => {
        acc[curr.key] = curr.value
        return acc
    }, {})

    const siteName = settingsMap.siteName || "HIOPS"
    const description = settingsMap.siteDescription || "Strengthening social protection systems through proactive, humane, and data-driven solutions."
    const email = settingsMap.contactEmail || "info@fmhds.gov.ng"
    const phone = settingsMap.contactPhone || "+234 (0) 9 123 4567"
    const address = settingsMap.contactAddress || "Federal Secretariat Complex, Shehu Shagari Way, Central Area, Abuja."

    const primaryLinks = navItems.filter(i => i.group === "FOOTER_MAIN")
    const legalLinks = navItems.filter(i => i.group === "FOOTER_LEGAL")

    return (
        <footer className="bg-primary text-white">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {/* Column 1: About & Newsletter */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <Icons.logo className="h-6 w-6" />
                            <span className="text-xl font-bold tracking-tight">{siteName}</span>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Navigation</h4>
                            <nav className="flex flex-col gap-2 text-sm text-white/70">
                                {primaryLinks.map(link => (
                                    <Link key={link.id} href={link.href} className="hover:text-white transition-colors">{link.title}</Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Legal</h4>
                            <nav className="flex flex-col gap-2 text-sm text-white/70">
                                {legalLinks.map(link => (
                                    <Link key={link.id} href={link.href} className="hover:text-white transition-colors">{link.title}</Link>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Column 3: Contact & Socials */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider">Contact Us</h4>
                        <div className="space-y-3 text-sm text-white/80">
                            <div className="flex items-start gap-3">
                                <Icons.mapPin className="h-5 w-5 text-emerald-400 shrink-0" />
                                <p>{address}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icons.mail className="h-5 w-5 text-emerald-400 shrink-0" />
                                <p>{email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icons.phone className="h-5 w-5 text-emerald-400 shrink-0" />
                                <p>{phone}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Connect</h4>
                            <div className="flex gap-4">
                                <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                                        <Icons.twitter className="h-4 w-4" />
                                    </div>
                                </Link>
                                <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                                        <Icons.linkedin className="h-4 w-4" />
                                    </div>
                                </Link>
                                <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                                        <Icons.gitHub className="h-4 w-4" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
                    <p>© {new Date().getFullYear()} {siteName}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}
