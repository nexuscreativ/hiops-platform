import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { calculateVulnerabilityScore } from "@/lib/scoring"
import { orchestrateIntervention } from "@/lib/orchestration" // We need to create this singleton

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return new NextResponse("Unauthorized", { status: 401 })

        // Fetch Beneficiaries with Program info
        const beneficiaries = await prisma.beneficiary.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            include: {
                enrollments: {
                    include: {
                        program: true
                    }
                }
            }
        })

        return NextResponse.json(beneficiaries)
    } catch (error) {
        console.error("[BENEFICIARIES_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        // 1. Auth Check
        const session = await getServerSession(authOptions)
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // 2. Parse Body
        const body = await req.json()
        const { firstName, lastName, gender, dob, lga, community } = body

        // 3. Validation (Basic)
        if (!firstName || !lastName || !gender) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        // 4. Save to Database
        // Note: In a real "Sync" scenario, we might handle an array of records
        const beneficiary = await prisma.beneficiary.create({
            data: {
                firstName,
                lastName,
                gender,
                dateOfBirth: new Date(dob || "2000-01-01"), // Fallback for MVP
                lga: lga || "Unknown",
                state: "Lagos", // Default for MVP
                community: community || "Unknown",
                // Real-time Vulnerability Scoring
                vulnerabilityScore: calculateVulnerabilityScore({
                    age: new Date().getFullYear() - new Date(dob || "2000-01-01").getFullYear(),
                    gender: gender || "MALE",
                    lga: lga || "Unknown",
                }),
            },
        })

        // 5. Trigger Orchestration Engine (Async)
        // In production, this might be a queue job. Here we await it to return the result immediately.
        const orchestrationResult = await orchestrateIntervention(beneficiary.id, beneficiary.vulnerabilityScore)

        return NextResponse.json({ ...beneficiary, orchestration: orchestrationResult })
    } catch (error) {
        console.error("[BENEFICIARIES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
