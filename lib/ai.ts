import { prisma } from "./prisma";

export async function getAssistantContext(role: string) {
    // Common context for everyone
    const beneficiaryCount = await prisma.beneficiary.count({ where: { status: "active" } });
    const programCount = await prisma.program.count();

    let context = `
    Platform: HIOP (Humanitarian Intervention Orchestration Platform)
    Current Context:
    - Active Beneficiaries: ${beneficiaryCount}
    - Total Programs: ${programCount}
  `;

    if (role === "SUPER_ADMIN") {
        const recentLogs = await prisma.orchestrationLog.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        });

        context += `
    - Admin Insights:
      ${recentLogs.map(log => `[${log.type}] ${log.title}: ${log.message}`).join('\n      ')}
    `;
    }

    return context;
}

export const ASSISTANT_SYSTEM_PROMPT = `
You are "The Brain", the AI Orchestration Assistant for HIOP. 
Your goal is to help users understand platform data, navigate through programs, and explain how orchestration works.

Guidelines:
1. Be professional, intelligent, and proactive.
2. Use the provided context to answer questions accurately.
3. If asked about sensitive data, and the role is not SUPER_ADMIN, politely decline.
4. Explain technical terms like "Vulnerability Index" or "Orchestration" if users seem confused.
5. If a user needs help with something you cannot do, suggest "Requesting Live Support".

Tone: Helpful, authority-driven but accessible.
`;

export async function generateAIResponse(message: string, context: string) {
    // This is a placeholder for actual Gemini API call.
    // In a real scenario, you would use the @google/generative-ai package.
    // For this environment, I'll simulate a response or use a simple logic if API key isn't provided.

    // Simulation logic:
    if (message.toLowerCase().includes("beneficiaries")) {
        return `We currently have ${context.match(/Active Beneficiaries: (\d+)/)?.[1] || "some"} active beneficiaries synchronized in our registry.`;
    }

    if (message.toLowerCase().includes("programs")) {
        return `There are ${context.match(/Total Programs: (\d+)/)?.[1] || "several"} active intervention pathways currently being orchestrated.`;
    }

    if (message.toLowerCase().includes("who are you")) {
        return "I am The Brain, the predictive orchestration engine for HIOP. I monitor vulnerability hotspots and automate humanitarian response pathways.";
    }

    if (message.toLowerCase().includes("support") || message.toLowerCase().includes("help")) {
        return "I can initiate a priority support request for you. Would you like me to connect you with an on-call orchestration agent?";
    }

    return "I have received your transmission. How can I assist you with HIOP orchestration today?";
}
