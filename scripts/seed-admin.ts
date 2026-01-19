
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    const email = "admin@hiop.ng"
    const passwordRaw = "admin123"
    const hashedPassword = await bcrypt.hash(passwordRaw, 10)

    console.log(`Seeding admin user: ${email}`)

    const admin = await prisma.agent.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: "SUPER_ADMIN",
            active: true
        },
        create: {
            id: "ADMIN-001",
            name: "Super Admin",
            email,
            password: hashedPassword,
            role: "SUPER_ADMIN",
            pinCode: "0000", // Fallback
            cluster: "HQ",
            active: true
        }
    })

    console.log("Admin seeded successfully:")
    console.log({ id: admin.id, email: admin.email, role: admin.role })
    console.log(`Login with password: ${passwordRaw}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
