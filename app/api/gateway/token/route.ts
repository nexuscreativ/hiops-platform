import { NextRequest, NextResponse } from "next/server"

// Mock Credentials for Partners
const VALID_CLIENTS: Record<string, string> = {
    "UN-OCHA": "secret_un_123",
    "NEMA": "secret_nema_456",
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { clientId, clientSecret } = body

        if (!clientId || !clientSecret) {
            return new NextResponse("Missing credentials", { status: 400 })
        }

        if (VALID_CLIENTS[clientId] === clientSecret) {
            // In a real app, sign a real JWT here using 'jsonwebtoken' or 'jose'
            // For MVP: Return a base64 encoded mock token
            const mockToken = btoa(JSON.stringify({
                sub: clientId,
                scope: "read:beneficiaries",
                exp: Date.now() + 3600000 // 1 hour
            }))

            return NextResponse.json({
                access_token: mockToken,
                token_type: "Bearer",
                expires_in: 3600
            })
        }

        return new NextResponse("Invalid Client ID or Secret", { status: 401 })

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}
