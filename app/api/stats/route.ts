import { NextResponse } from "next/server"

export async function GET() {
    // Simulated metrics for institutional demonstration
    const stats = {
        beneficiaries: {
            total: 1245678,
            verified: 1201450,
            pending: 44228,
            growth: "+12.5%"
        },
        interventions: {
            active: 142,
            completed: 856,
            ongoing: 58,
            successRate: "98.2%"
        },
        fieldOps: {
            agents: 4250,
            activeClusters: 36,
            avgResponseTime: "4h 12m"
        },
        shockSignals: {
            detectedToday: 12,
            level: "MODERATE",
            hotspots: ["Maiduguri", "Kano", "Lokoja"]
        }
    }

    return NextResponse.json(stats)
}
