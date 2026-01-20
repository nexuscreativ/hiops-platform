import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

async function GET_handler(req: any, res: any) {
    console.log("GET /api/auth request received")
    return await handler(req, res)
}

async function POST_handler(req: any, res: any) {
    console.log("POST /api/auth request received")
    return await handler(req, res)
}

export { GET_handler as GET, POST_handler as POST }
