"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <span className="inline-flex items-center rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
          Official Humanitarian Infrastructure
        </span>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl">
          The Operating System <br className="hidden sm:inline" />
          for <span className="text-[#01A651]">National Resilience.</span>
        </h1>
        <p className="max-w-[700px] text-xl text-muted-foreground">
          Strengthening social protection systems through proactive, humane, and data-driven solutions.
          HIOPS unifies Nigeria's humanitarian coordination into a single-source-of-truth engine.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/login"
          className={buttonVariants({ size: "lg", className: "bg-primary hover:bg-primary/90 text-white" })}
        >
          Institutional Access
        </Link>
        <Link
          href="/whitepaper"
          className={buttonVariants({ variant: "outline", size: "lg", className: "border-primary text-primary hover:bg-primary/5" })}
        >
          Strategy Whitepaper
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 text-3xl">🏛️</div>
          <h3 className="mb-2 text-xl font-bold text-[#046379]">Intelligence</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Institutional orchestration engine. Integrates research, data, and planning to
            automate humanitarian response and social safety nets.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 text-3xl">🤝</div>
          <h3 className="mb-2 text-xl font-bold text-[#046379]">Operations</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Empowerment at the last mile. Inclusive, offline-first tools designed to treat
            vulnerable populations with dignity and compassion.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 text-3xl">🛡️</div>
          <h3 className="mb-2 text-xl font-bold text-[#046379]">Registry</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Transparent and accountable beneficiary management. Eliminates leakage through
            biometric verification and unified data orchestration.
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-[#046379] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex flex-col gap-12 md:flex-row md:items-center relative z-10">
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-3xl font-black mb-2 tracking-tight">Institutional Intelligence in Action</h2>
              <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Orchestrating National Social Protection</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:bg-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>
                <div>
                  <p className="text-sm font-bold">Registry Sync Active</p>
                  <p className="text-xs text-white/50">{stats?.beneficiaries?.verified.toLocaleString() || "1,201,450"} Households Verified site-wide.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:bg-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                  <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                </div>
                <div>
                  <p className="text-sm font-bold">Intervention Threshold Signal</p>
                  <p className="text-xs text-white/50">{stats?.shockSignals?.detectedToday || "12"} regional shocks addressed in last 24h.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-[2.5rem] border border-white/20 bg-white/10 p-10 text-center backdrop-blur-xl relative group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem]"></div>
              <p className="text-[10px] font-black text-white/30 tracking-[0.4em] uppercase mb-8">Ground Reality Dashboard</p>
              <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="space-y-1">
                  <p className="text-4xl font-black text-emerald-400">{stats?.beneficiaries?.growth || "+12.5%"}</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Enrollment Velocity</p>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black">{stats?.fieldOps?.activeClusters || "36"}</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">LGA Clusters</p>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-white/10 relative z-10">
                <p className="text-sm font-medium text-emerald-300">Live Orchestration Active</p>
                <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[88%] animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
