import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
    try {
        const items = await prisma.navigationItem.findMany({
            orderBy: { order: "asc" }
        })
        return NextResponse.json(items)
    } catch (error) {
        console.error("[NAVIGATION_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    const user = session?.user // Safe access
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { title, href, order, group, target, id } = body

        if (!title || !href) {
            return new NextResponse("Title and HREF are required", { status: 400 })
        }

        if (id) {
            // Update
            const item = await prisma.navigationItem.update({
                where: { id },
                data: { title, href, order: Number(order), group, target }
            })
            return NextResponse.json(item)
        } else {
            // Create
            const item = await prisma.navigationItem.create({
                data: { title, href, order: Number(order), group, target }
            })
            return NextResponse.json(item)
        }
    } catch (error) {
        console.error("[NAVIGATION_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions)
    const user = session?.user // Safe access
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return new NextResponse("ID is required", { status: 400 })
        }

        await prisma.navigationItem.delete({ where: { id } })
        return new NextResponse("Deleted", { status: 200 })
    } catch (error) {
        console.error("[NAVIGATION_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
