const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
    console.log("Seeding CMS data...")

    // 1. Site Settings
    const settings = [
        { key: "siteName", value: "HIOPS" },
        { key: "siteDescription", value: "The Humanitarian Intelligence & Operations System - Strengthening Nigeria's Social Protection Systems." },
        { key: "contactEmail", value: "info@fmhds.gov.ng" },
        { key: "contactPhone", value: "+234 (0) 9 123 4567" },
        { key: "contactAddress", value: "Federal Secretariat Complex, Shehu Shagari Way, Central Area, Abuja." },
    ]

    for (const s of settings) {
        await prisma.siteSetting.upsert({
            where: { key: s.key },
            update: { value: s.value },
            create: s
        })
    }

    // 2. Navigation Items
    const nav = [
        { title: "Intelligence", href: "/intelligence", group: "HEADER", order: 1 },
        { title: "Registry", href: "/registry", group: "HEADER", order: 2 },
        { title: "Pathways", href: "/programs", group: "HEADER", order: 3 },
        { title: "FieldLink", href: "/fieldlink", group: "HEADER", order: 4 },

        { title: "Social Protection", href: "#", group: "FOOTER_MAIN", order: 1 },
        { title: "Disaster Management", href: "#", group: "FOOTER_MAIN", order: 2 },

        { title: "Privacy Policy", href: "#", group: "FOOTER_LEGAL", order: 1 },
        { title: "Terms of Service", href: "#", group: "FOOTER_LEGAL", order: 2 },
    ]

    for (const n of nav) {
        await prisma.navigationItem.create({ data: n })
    }

    // 3. Initial Theme
    await prisma.themeConfig.upsert({
        where: { name: "Default Institutional" },
        update: {},
        create: {
            name: "Default Institutional",
            primary: "#046379",
            secondary: "#01A651",
            accent: "#F59E0B",
            background: "#F8FAFC",
            isDefault: true
        }
    })

    console.log("Seeding complete.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
