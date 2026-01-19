import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "SUPER_ADMIN" && (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const services = await prisma.apiService.findMany({
            orderBy: { name: "asc" }
        })
        return NextResponse.json(services)
    } catch (error) {
        console.error("[SERVICES_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "SUPER_ADMIN" && (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { name, description, apiKey, apiSecret, endpoint, environment, status, metadata } = body

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const service = await prisma.apiService.create({
            data: {
                name,
                description,
                apiKey,
                apiSecret,
                endpoint,
                environment,
                status,
                metadata
            }
        })

        return NextResponse.json(service)
    } catch (error) {
        console.error("[SERVICES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
