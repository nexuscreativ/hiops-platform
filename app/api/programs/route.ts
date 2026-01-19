
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

        const programs = await prisma.program.findMany({
            orderBy: { startDate: 'desc' },
            include: {
                _count: {
                    select: { enrollments: true }
                }
            }
        })

        return NextResponse.json(programs)
    } catch (error) {
        console.error("[PROGRAMS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        // RBAC: Only Admin can create programs
        if (!session || (session.user as any).role === "AGENT") {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const { name, type, description, startDate, endDate } = body

        if (!name || !type || !startDate) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const program = await prisma.program.create({
            data: {
                name,
                type,
                description,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
            }
        })

        return NextResponse.json(program)
    } catch (error) {
        console.error("[PROGRAMS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
