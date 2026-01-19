"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Message = {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

type AssistantContextType = {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    messages: Message[]
    addMessage: (role: "user" | "assistant", content: string) => void
    isVoiceActive: boolean
    setIsVoiceActive: (active: boolean) => void
    clearMessages: () => void
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined)

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [isVoiceActive, setIsVoiceActive] = useState(false)

    // Initialize with a welcome message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: "welcome",
                    role: "assistant",
                    content: "Hello! I am The Brain, your HIOP Orchestration Assistant. How can I help you today?",
                    timestamp: new Date(),
                },
            ])
        }
    }, [])

    const addMessage = (role: "user" | "assistant", content: string) => {
        const newMessage: Message = {
            id: Math.random().toString(36).substring(7),
            role,
            content,
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, newMessage])
    }

    const clearMessages = () => {
        setMessages([])
    }

    return (
        <AssistantContext.Provider
            value={{
                isOpen,
                setIsOpen,
                messages,
                addMessage,
                isVoiceActive,
                setIsVoiceActive,
                clearMessages,
            }}
        >
            {children}
        </AssistantContext.Provider>
    )
}

export const useAssistant = () => {
    const context = useContext(AssistantContext)
    if (context === undefined) {
        throw new Error("useAssistant must be used within an AssistantProvider")
    }
    return context
}
