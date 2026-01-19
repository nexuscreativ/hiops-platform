import { prisma } from "@/lib/prisma"

const EMERGENCY_CASH_PROGRAM = {
    name: "Emergency Cash Transfer (CVA)",
    type: "CASH_TRANSFER",
    description: "Automated relief for high-vulnerability individuals."
}

export async function orchestrateIntervention(beneficiaryId: string, vulnerabilityScore: number) {
    if (vulnerabilityScore > 80) {
        // 1. Find or Create the Emergency Program (Idempotent)
        const program = await prisma.program.upsert({
            where: { id: "PROG-AUTO-CVA" }, // Fixed ID for MVP
            update: {},
            create: {
                id: "PROG-AUTO-CVA",
                ...EMERGENCY_CASH_PROGRAM,
                startDate: new Date(),
            }
        })

        // 2. Auto-Enroll the Beneficiary
        await prisma.enrollment.create({
            data: {
                beneficiaryId,
                programId: program.id,
                status: "ENROLLED",
            }
        })

        console.log(`[ORCHESTRATION] Auto-enrolled ${beneficiaryId} into ${program.name}`)
        return { action: "ENROLLED", program: program.name }
    }

    return { action: "NONE" }
}
