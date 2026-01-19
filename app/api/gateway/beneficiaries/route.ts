import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
    // 1. Validate Token (Mock Middleware)
    const authHeader = req.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new NextResponse("Missing or Invalid Token", { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    try {
        // Mock Decode
        const payload = JSON.parse(atob(token))
        if (Date.now() > payload.exp) {
            return new NextResponse("Token Expired", { status: 401 })
        }

        // 2. Fetch Data (Scoped)
        // Partners only see anonymized or specific fields
        const beneficiaries = await prisma.beneficiary.findMany({
            take: 50,
            select: {
                id: true,
                lga: true,
                gender: true,
                vulnerabilityScore: true,
                status: true,
                createdAt: true,
                // PII Excluded (Name, Phone)
            }
        })

        return NextResponse.json({
            meta: {
                requester: payload.sub,
                count: beneficiaries.length,
            },
            data: beneficiaries
        })

    } catch (e) {
        return new NextResponse("Invalid Token Structure", { status: 403 })
    }
}
