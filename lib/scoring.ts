export type ScoringParams = {
    age: number
    gender: string
    lga: string
    community?: string
}

// Mock Risk Data (In a real system, this would come from a "Disaster Database" or "Shock API")
const LGA_RISK_FACTORS: Record<string, number> = {
    "Kano Municipal": 1.2, // Urban poverty risk
    "Maiduguri": 1.5,      // Conflict risk
    "Damboa": 1.8,         // High conflict/displacement
    "Epe": 0.8,            // Moderate flood risk
    "Unknown": 1.0,        // Baseline
}

export function calculateVulnerabilityScore(params: ScoringParams): number {
    let score = 50 // Base Score

    // 1. Location Risk (Multiplier)
    const locationMultiplier = LGA_RISK_FACTORS[params.lga] || 1.0
    score = score * locationMultiplier

    // 2. Demographic Vulnerabilities
    // Elderly (+15)
    if (params.age > 60) {
        score += 15
    }
    // Children (+10)
    if (params.age < 5) {
        score += 10
    }

    // Gender-based (Female Headed Households often higher risk in certain contexts - +5)
    if (params.gender === "FEMALE") {
        score += 5
    }

    // Cap at 100
    return Math.min(score, 100)
}
