import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // 1. Total Beneficiaries
        const verifiedBeneficiaries = await prisma.beneficiary.count({
            where: { status: 'active' }
        })

        // 2. Vulnerability Index (Average Score)
        const aggregation = await prisma.beneficiary.aggregate({
            _avg: {
                vulnerabilityScore: true,
            },
        })
        const averageVulnerability = aggregation._avg.vulnerabilityScore || 0

        // 3. Simulated "Leakage Prevented"
        // Formula: Assuming 5% of attempted registrations are duplicates caught by the system
        // Value: 5% of verified * 50,000 Naira (avg grant)
        const estimatedDuplicates = Math.round(verifiedBeneficiaries * 0.05)
        const leakagePreventedNaira = estimatedDuplicates * 50000

        // 4. Resource Utilization (Mock for now, or based on Program Enrollment)
        const programsCount = await prisma.program.count()
        const utilizationRate = programsCount > 0 ? 88 : 0

        // 5. AI Insights (Orchestration Logs)
        const insights = await prisma.orchestrationLog.findMany({
            take: 3,
            orderBy: { createdAt: 'desc' }
        })

        // 6. Active Pathways (Programs)
        const activePathways = await prisma.program.findMany({
            take: 3,
            orderBy: { startDate: 'desc' },
            include: {
                _count: {
                    select: { enrollments: true }
                }
            }
        })

        return NextResponse.json({
            metrics: {
                verifiedBeneficiaries,
                vulnerabilityIndex: Number(averageVulnerability.toFixed(1)),
                leakagePrevented: leakagePreventedNaira,
                resourceUtilization: utilizationRate,
            },
            insights,
            activePathways,
            timestamp: new Date().toISOString(),
        })

    } catch (error) {
        console.error("[ANALYTICS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
