import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login", // We will create this
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // Admin Login
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                // Agent Login
                agentId: { label: "Agent ID", type: "text" },
                pin: { label: "PIN", type: "password" },
            },
            async authorize(credentials) {
                // 1. Admin Login Flow (Email/Password)
                if (credentials?.email && credentials?.password) {
                    const admin = await prisma.agent.findUnique({
                        where: { email: credentials.email }
                    })

                    // Verify Admin
                    if (!admin || !admin.password) return null

                    // Verify Password
                    const isValid = await bcrypt.compare(credentials.password, admin.password)
                    if (!isValid) return null

                    // Verify Active
                    if (!admin.active) throw new Error("Account is inactive")

                    return {
                        id: admin.id,
                        name: admin.name,
                        email: admin.email,
                        role: admin.role, // SUPER_ADMIN
                    }
                }

                // 2. Field Agent Login Flow (ID/PIN)
                if (credentials?.agentId && credentials?.pin) {
                    const agent = await prisma.agent.findUnique({
                        where: { id: credentials.agentId }
                    })

                    // Verify Agent
                    if (!agent || !agent.pinCode) return null

                    // Verify PIN (Direct comparison for MVP, recommend hashing later)
                    if (agent.pinCode !== credentials.pin) return null

                    // Verify Active
                    if (!agent.active) throw new Error("Agent account is inactive")

                    return {
                        id: agent.id,
                        name: agent.name,
                        email: agent.email,
                        role: agent.role, // AGENT
                    }
                }

                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role
            }
            return session
        },
    },
}
