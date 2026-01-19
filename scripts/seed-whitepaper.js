const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
    console.log("Seeding Strategic Whitepaper...")

    const whitepaperContent = {
        blocks: [
            { type: "heading", value: "Strategic Whitepaper: The OS for Resilience" },
            { type: "text", value: "The Humanitarian Intelligence & Orchestration Platform (HIOP) represents a fundamental shift in Nigeria's humanitarian landscape. By moving from reactive, siloed interventions to a proactive, data-driven 'Operating System for Resilience,' we are building the sovereign digital infrastructure necessary to protect and empower vulnerable populations." },

            { type: "heading", value: "1. The Vision: Data-Driven Humanity" },
            { type: "text", value: "HIOP is designed to unify beneficiary data across multiple agencies, automating support flows and enabling real-time orchestration of interventions. Our goal is to ensure that no Nigerian is left behind by creating a single, verified 'Source of Truth' for humanitarian aid." },

            { type: "heading", value: "2. Identity Resolution & Biometrics" },
            { type: "text", value: "To eliminate fraud and 'ghost' beneficiaries, HIOP implements a robust deduplication engine using fuzzy-logic matching (Levenshtein distance) and phonetic algorithms. All biometric data is stored as encrypted templates in compliance with ISO/IEC standards, ensuring both privacy and cross-platform interoperability." },

            { type: "heading", value: "3. 'The Brain': AI-Powered Orchestration" },
            { type: "text", value: "At the core of the platform is 'The Brain,' a data lake utilizing PostgreSQL for transactions and Elasticsearch for high-speed analytics. We leverage Gradient Boosted Trees to predict beneficiary risk levels, correlating demographic data with real-time shock indicators such as climate shifts and market fluctuations." },

            { type: "heading", value: "4. Inclusive Design & Local Dialects" },
            { type: "text", value: "Recognizing Nigeria's diverse linguistic landscape, HIOP prioritizes 'Voice-First' interactions via Interactive Voice Response (IVR) in local dialects. Our field agent applications use symbolic, 'Icon-First' layouts to minimize cognitive load and eliminate the friction of traditional text-heavy forms." },

            { type: "heading", value: "5. Sovereignty & Compliance" },
            { type: "text", value: "In strict adherence to the Nigeria Data Protection Act (NDPA) 2023, HIOP implements 'Privacy by Design.' All beneficiary data is hosted on sovereign Nigerian-based cloud infrastructure (Galaxy Backbone), ensuring complete data residency and national control over sensitive information." },

            { type: "heading", value: "6. Roadmap to National Rollout" },
            { type: "text", value: "Our implementation follows a three-phase strategy: Phase 1 establishes the Foundation & Proof in a target LGA; Phase 2 scales the platform through a Multi-agency API Gateway; and Phase 3 achieves Full Orchestration with national predictive analytics coverage." }
        ]
    }

    // Upsert the custom page
    await prisma.customPage.upsert({
        where: { slug: "whitepaper" },
        update: {
            title: "Strategic Whitepaper",
            content: whitepaperContent,
            published: true
        },
        create: {
            title: "Strategic Whitepaper",
            slug: "whitepaper",
            content: whitepaperContent,
            published: true
        }
    })

    // Add navigation link in the footer if not exists
    const existingNav = await prisma.navigationItem.findFirst({
        where: { href: "/whitepaper" }
    })

    if (!existingNav) {
        await prisma.navigationItem.create({
            data: {
                title: "Strategic Whitepaper",
                href: "/whitepaper",
                group: "FOOTER_LEGAL", // Putting it under legal/docs
                order: 3
            }
        })
    }

    console.log("Strategic Whitepaper seeded successfully.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
