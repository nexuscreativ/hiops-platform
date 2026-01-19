import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
    try {
        const themes = await prisma.themeConfig.findMany()
        const activeTheme = themes.find(t => t.isDefault) || themes[0]
        return NextResponse.json({ activeTheme, themes })
    } catch (error) {
        console.error("[THEME_GET]", error)
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
        const { name, primary, secondary, accent, background, id, isDefault } = body

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (isDefault) {
            // Unset other defaults
            await prisma.themeConfig.updateMany({
                where: { isDefault: true },
                data: { isDefault: false }
            })
        }

        let theme
        if (id) {
            theme = await prisma.themeConfig.update({
                where: { id },
                data: { name, primary, secondary, accent, background, isDefault }
            })
        } else {
            theme = await prisma.themeConfig.create({
                data: { name, primary, secondary, accent, background, isDefault }
            })
        }

        return NextResponse.json(theme)
    } catch (error) {
        console.error("[THEME_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
