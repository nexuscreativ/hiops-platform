import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
    try {
        const settings = await prisma.siteSetting.findMany()
        // Convert array to object for easier frontend usage
        const settingsMap = settings.reduce((acc: any, curr) => {
            acc[curr.key] = curr.value
            return acc
        }, {})
        return NextResponse.json(settingsMap)
    } catch (error) {
        console.error("[SETTINGS_GET]", error)
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

        // Body should be an object of key-value pairs
        // e.g. { "siteName": "HIOPS V2", "contactEmail": "info@hio.gov.ng" }

        const upserts = Object.entries(body).map(([key, value]) => {
            return prisma.siteSetting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) }
            })
        })

        await Promise.all(upserts)
        return new NextResponse("Settings updated", { status: 200 })
    } catch (error) {
        console.error("[SETTINGS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
