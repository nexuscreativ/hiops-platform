import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
    try {
        const pages = await prisma.customPage.findMany({
            orderBy: { updatedAt: "desc" }
        })
        return NextResponse.json(pages)
    } catch (error) {
        console.error("[PAGES_GET]", error)
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
        const { title, slug, content, published, id } = body

        if (!title || !slug) {
            return new NextResponse("Title and Slug are required", { status: 400 })
        }

        if (id) {
            const page = await prisma.customPage.update({
                where: { id },
                data: { title, slug, content, published }
            })
            return NextResponse.json(page)
        } else {
            const page = await prisma.customPage.create({
                data: { title, slug, content, published }
            })
            return NextResponse.json(page)
        }
    } catch (error) {
        console.error("[PAGES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "SUPER_ADMIN" && (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return new NextResponse("ID is required", { status: 400 })
        }

        await prisma.customPage.delete({ where: { id } })
        return new NextResponse("Deleted", { status: 200 })
    } catch (error) {
        console.error("[PAGES_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
