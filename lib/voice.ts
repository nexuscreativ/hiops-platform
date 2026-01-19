"use client"

// Text-to-Speech (TTS) helper
export function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices()
    // Preference: A clear English voice
    const voice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en-US')
    if (voice) utterance.voice = voice

    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    window.speechSynthesis.speak(utterance)
}

// Speech-to-Text (STT) helper - Simplified interface
export function createSpeechRecognition(onResult: (text: string) => void, onEnd: () => void) {
    if (typeof window === "undefined") return null

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return null

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript
        onResult(text)
    }

    recognition.onend = onEnd

    return recognition
}
