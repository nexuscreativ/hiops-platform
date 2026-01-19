import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getAssistantContext, generateAIResponse } from "@/lib/ai"

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const body = await req.json()
        const { message } = body

        if (!message) {
            return new NextResponse("Message is required", { status: 400 })
        }

        const role = session?.user?.role || "GUEST"

        // 1. Get context based on role
        const context = await getAssistantContext(role)

        // 2. Generate AI reply
        const reply = await generateAIResponse(message, context)

        return NextResponse.json({ reply })

    } catch (error) {
        console.error("[ASSISTANT_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
