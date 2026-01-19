"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
    Activity,
    AlertCircle,
    Brain,
    ChevronRight,
    Fingerprint,
    Layers,
    Map,
    ShieldCheck,
    Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const DashboardMetric = ({
    title,
    value,
    description,
    icon: Icon,
    trend,
}: {
    title: string
    value: string
    description: string
    icon: any
    trend?: string
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">
                {description} {trend && <span className="ml-1 text-green-500">{trend}</span>}
            </p>
        </CardContent>
    </Card>
)

export default function BrainDashboard() {
    const [metrics, setMetrics] = useState({
        verifiedBeneficiaries: 0,
        vulnerabilityIndex: 0,
        leakagePrevented: 0,
        resourceUtilization: 0,
    })
    const [insights, setInsights] = useState<any[]>([])
    const [activePathways, setActivePathways] = useState<any[]>([])

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch("/api/analytics")
                if (res.ok) {
                    const data = await res.json()
                    setMetrics(data.metrics)
                    setInsights(data.insights || [])
                    setActivePathways(data.activePathways || [])
                }
            } catch (error) {
                console.error("Failed to fetch analytics", error)
            }
        }
        fetchMetrics()
    }, [])

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Intelligence: Orchestration Command</h2>
                    <p className="text-muted-foreground">
                        Predictive Orchestration Engine for National Resilience and Vulnerability Mapping.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">Institutional Handover</Button>
                    <Button className="bg-[#046379] hover:bg-[#035264] text-white">Trigger Response Pathway</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardMetric
                    title="Vulnerability Index"
                    value={metrics.vulnerabilityIndex.toFixed(1)}
                    description="Real-time aggregation"
                    icon={Activity}
                // trend="-"
                />
                <DashboardMetric
                    title="Verified Beneficiaries"
                    value={metrics.verifiedBeneficiaries.toLocaleString()}
                    description="Synchronized Registry"
                    icon={ShieldCheck}
                    trend="Live"
                />
                <DashboardMetric
                    title="Leakage Prevented"
                    value={`₦${(metrics.leakagePrevented / 1000000).toFixed(1)}M`}
                    description="Est. duplication savings"
                    icon={Zap}
                    trend="AI-Verified"
                />
                <DashboardMetric
                    title="Resource Utilization"
                    value={`${metrics.resourceUtilization}%`}
                    description="Optimal allocation"
                    icon={Layers}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Predictive Health Map</CardTitle>
                        <CardDescription>
                            Real-time regional vulnerability hotspots and intervention flow.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="flex h-[350px] items-center justify-center rounded-lg border border-dashed bg-slate-50 dark:bg-slate-900/50">
                            <div className="text-center">
                                <Map className="mx-auto h-12 w-12 text-slate-300" />
                                <p className="mt-2 text-sm text-slate-500">Interactive Map Visualization Layer</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>AI Insights Log</CardTitle>
                        <CardDescription>
                            Autonomous observations from the Orchestration Engine.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {insights.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No recent insights generated.</p>
                            ) : (
                                insights.map((log) => (
                                    <div key={log.id} className={`flex items-start space-x-4 rounded-lg p-3 ${log.type === 'WARNING' ? 'bg-red-50 dark:bg-red-900/20' :
                                        log.type === 'SUCCESS' ? 'bg-emerald-50 dark:bg-emerald-900/20' :
                                            'bg-blue-50 dark:bg-blue-900/20'
                                        }`}>
                                        {log.type === 'WARNING' ? <AlertCircle className="mt-1 h-5 w-5 text-red-600" /> :
                                            log.type === 'SUCCESS' ? <Fingerprint className="mt-1 h-5 w-5 text-emerald-600" /> :
                                                <Brain className="mt-1 h-5 w-5 text-blue-600" />}
                                        <div>
                                            <p className="text-sm font-medium">{log.title}</p>
                                            <p className="text-xs text-muted-foreground">{log.message}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Active Intervention Pathways</CardTitle>
                    <CardDescription>
                        Monitoring the lifecycle of automated humanitarian support flows.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {activePathways.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No active programs found.</p>
                        ) : (
                            activePathways.map((path) => (
                                <div key={path.id} className="flex items-center">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{path.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {path._count?.enrollments || 0} beneficiaries verified via Unified Registry
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        <span className="mr-4 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
                                            Active
                                        </span>
                                        <Link href={`#${path.id}`} className="text-muted-foreground hover:text-foreground">
                                            <ChevronRight className="inline h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
