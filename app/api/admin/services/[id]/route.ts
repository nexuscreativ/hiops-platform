import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "SUPER_ADMIN" && (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const service = await prisma.apiService.findUnique({
            where: { id }
        })
        return NextResponse.json(service)
    } catch (error) {
        console.error("[SERVICE_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "SUPER_ADMIN" && (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { name, description, apiKey, apiSecret, endpoint, environment, status, metadata } = body

        const service = await prisma.apiService.update({
            where: { id },
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
        console.error("[SERVICE_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "SUPER_ADMIN" && (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const service = await prisma.apiService.delete({
            where: { id }
        })
        return NextResponse.json(service)
    } catch (error) {
        console.error("[SERVICE_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
