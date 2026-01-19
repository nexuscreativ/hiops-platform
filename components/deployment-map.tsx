"use client"

import React, { useState, useEffect } from "react"
import { MapPin, Users, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

export function DeploymentMap() {
    const [hoveredState, setHoveredState] = useState<string | null>(null)
    const [stats, setStats] = useState<any>(null)

    useEffect(() => {
        fetch("/api/stats")
            .then(res => res.json())
            .then(data => setStats(data))
    }, [])

    // Simplified coordinates/points for major Nigerian clusters
    const clusters = [
        { name: "North-West Cluster", x: "35%", y: "25%", beneficiaries: "450k", status: "Active" },
        { name: "North-East Cluster", x: "75%", y: "30%", beneficiaries: "820k", status: "Critical" },
        { name: "Central Cluster", x: "50%", y: "50%", beneficiaries: "310k", status: "Active" },
        { name: "South-West Cluster", x: "25%", y: "75%", beneficiaries: "190k", status: "Stable" },
        { name: "South-South Cluster", x: "55%", y: "85%", beneficiaries: "270k", status: "Active" },
    ]

    return (
        <div className="relative w-full aspect-[4/3] bg-slate-900/5 rounded-[3rem] p-8 border border-slate-100 overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <span className="text-[12rem] font-black text-slate-200 select-none">NG</span>
            </div>

            {/* Interactive Points */}
            <div className="relative w-full h-full">
                {clusters.map((cluster, i) => (
                    <div
                        key={i}
                        className="absolute cursor-pointer transition-transform hover:scale-110"
                        style={{ left: cluster.x, top: cluster.y }}
                        onMouseEnter={() => setHoveredState(cluster.name)}
                        onMouseLeave={() => setHoveredState(null)}
                    >
                        <div className={cn(
                            "h-5 w-5 rounded-full animate-ping absolute opacity-40",
                            cluster.status === "Critical" ? "bg-red-500" : "bg-emerald-500"
                        )}></div>
                        <div className={cn(
                            "h-5 w-5 rounded-full shadow-lg relative z-10",
                            cluster.status === "Critical" ? "bg-red-500" : "bg-emerald-500"
                        )}></div>

                        {hoveredState === cluster.name && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-white shadow-2xl rounded-2xl p-4 border border-slate-100 z-50">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-black text-[#046379] uppercase tracking-wider">{cluster.name}</span>
                                    <div className="flex items-center gap-2 text-slate-600 mt-1">
                                        <Users className="h-3 w-3" />
                                        <span className="text-sm font-bold">{cluster.beneficiaries}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Activity className="h-3 w-3" />
                                        <span className="text-[10px] font-medium uppercase tracking-widest">{cluster.status}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Legend / Stats overlay */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-100 shadow-xl max-w-xs">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Ground Reality Sync</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-8">
                            <span className="text-sm font-bold text-slate-700">Total Enrolled</span>
                            <span className="text-lg font-black text-[#046379]">{stats?.beneficiaries?.total.toLocaleString() || "..."}</span>
                        </div>
                        <div className="flex items-center justify-between gap-8">
                            <span className="text-sm font-bold text-slate-700">Active Agents</span>
                            <span className="text-lg font-black text-[#01A651]">{stats?.fieldOps?.agents || "..."}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2 px-6">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Operations</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-500">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Immediate Shock (NE)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
