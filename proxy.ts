import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // 1. Unauthenticated Redirects (Custom Login Paths)
        if (!token) {
            if (path.startsWith("/agent")) {
                return NextResponse.redirect(new URL("/agent-login", req.url))
            }
            // Default Admin Login for everything else protected
            return NextResponse.redirect(
                new URL(`/login?callbackUrl=${encodeURIComponent(path)}`, req.url)
            )
        }

        // 2. Role-Based Access Control (RBAC)
        if (
            path.startsWith("/console") ||
            path.startsWith("/agent")
        ) {
            if (token?.role !== "SUPER_ADMIN" && token?.role !== "ADMIN" && token?.role !== "AGENT") {
                // If they have no valid role, they shouldn't be here
                return NextResponse.redirect(new URL("/login", req.url))
            }

            // Further granular check: Agents only in /agent, Admins in /console
            if (path.startsWith("/console") && token?.role === "AGENT") {
                return NextResponse.redirect(new URL("/agent", req.url))
            }
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
)

export const config = {
    matcher: [
        "/agent/:path*",
        "/console/:path*",
    ],
}
