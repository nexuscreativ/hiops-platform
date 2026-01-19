"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Mic, Volume2, VolumeX, Trash2, Brain, AlertCircle } from "lucide-react"
import { useAssistant, Message } from "./AssistantProvider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { speak, createSpeechRecognition } from "@/lib/voice"

export const AssistantChat: React.FC = () => {
    const {
        isOpen,
        messages,
        addMessage,
        isVoiceActive,
        setIsVoiceActive,
        clearMessages
    } = useAssistant()
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }

        // Voice response for last assistant message
        const lastMessage = messages[messages.length - 1]
        if (lastMessage?.role === "assistant" && isVoiceActive) {
            speak(lastMessage.content)
        }
    }, [messages, isTyping, isVoiceActive])

    const [isListening, setIsListening] = useState(false)
    const recognitionRef = useRef<any>(null)

    if (!isOpen) return null

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = input.trim()
        setInput("")
        addMessage("user", userMessage)

        setIsTyping(true)

        try {
            // Logic for API call will go here in Phase 3
            const response = await fetch("/api/ai/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            })

            if (response.ok) {
                const data = await response.json()
                addMessage("assistant", data.reply)
            } else {
                addMessage("assistant", "I am having trouble connecting to my neural network right now. Please try again later.")
            }
        } catch (error) {
            addMessage("assistant", "An error occurred while transmitting to The Brain.")
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <div className="fixed bottom-24 right-6 z-50 w-[320px] h-[520px] bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/40 dark:border-slate-800/40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-500 ring-1 ring-white/20">
            {/* Header */}
            <div className="p-5 bg-slate-900/10 dark:bg-white/5 border-b border-white/20 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#046379] rounded-2xl shadow-lg ring-1 ring-white/30">
                        <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black tracking-tight text-slate-800 dark:text-white uppercase">The Brain</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Orchestration AI</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setIsVoiceActive(!isVoiceActive)}
                        className={cn(
                            "p-2 rounded-xl transition-all duration-300",
                            isVoiceActive ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "hover:bg-white/20 text-slate-500 dark:text-slate-400"
                        )}
                        title={isVoiceActive ? "Voice On" : "Voice Off"}
                    >
                        {isVoiceActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </button>
                    <button
                        onClick={clearMessages}
                        className="p-2 hover:bg-white/20 text-slate-500 dark:text-slate-400 rounded-xl transition-all duration-300"
                        title="Clear Chat"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div
                className="flex-1 p-5 overflow-y-auto scrollbar-none"
                ref={scrollRef}
            >
                <div className="space-y-5">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex flex-col max-w-[90%] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
                                msg.role === "user" ? "ml-auto items-end" : "items-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "p-4 rounded-[1.5rem] text-[13px] leading-relaxed shadow-sm",
                                    msg.role === "user"
                                        ? "bg-[#046379] text-white rounded-tr-none shadow-[#046379]/20"
                                        : "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-slate-800 dark:text-slate-200 rounded-tl-none border border-white/40 dark:border-slate-700/40 shadow-slate-200/50 dark:shadow-none"
                                )}
                            >
                                {msg.content}
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-1.5 px-2 uppercase tracking-widest">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 animate-pulse pb-2">
                            <div className="p-2 bg-white/60 dark:bg-slate-800/60 rounded-full border border-white/40 dark:border-slate-700/40">
                                <Brain className="h-4 w-4" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider">Processing...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Input */}
            <div className="p-5 bg-white/20 dark:bg-slate-900/20 border-t border-white/20 backdrop-blur-md">
                <div className="relative flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Type command..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/60 rounded-[1.25rem] px-4 py-3 text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#046379] pr-20 transition-all backdrop-blur-sm text-slate-900 dark:text-white"
                    />
                    <div className="absolute right-1 flex items-center gap-1">
                        <button
                            onClick={() => addMessage("user", "I need live support")}
                            className="p-2 hover:bg-[#046379]/10 text-[#046379] rounded-lg transition-colors"
                            title="Priority Support"
                        >
                            <AlertCircle className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="p-2 bg-[#046379] text-white rounded-xl hover:bg-[#035264] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#046379]/30"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500",
                            isListening
                                ? "bg-red-500 text-white shadow-lg shadow-red-500/40 animate-pulse scale-105"
                                : "bg-slate-900/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-[#046379] hover:text-white hover:shadow-lg hover:shadow-[#046379]/30"
                        )}
                        onMouseDown={() => {
                            const rec = createSpeechRecognition(
                                (text) => setInput(text),
                                () => setIsListening(false)
                            )
                            if (rec) {
                                recognitionRef.current = rec
                                rec.start()
                                setIsListening(true)
                            }
                        }}
                        onMouseUp={() => {
                            if (recognitionRef.current) {
                                recognitionRef.current.stop()
                                setIsListening(false)
                            }
                        }}
                    >
                        <Mic className={cn("h-3 w-3", isListening && "animate-pulse")} />
                        {isListening ? "Listening" : "Hold to speak"}
                    </button>
                </div>
            </div>
        </div>
    )
}
