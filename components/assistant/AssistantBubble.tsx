"use client"

import React from "react"
import { Brain, X } from "lucide-react"
import { useAssistant } from "./AssistantProvider"
import { cn } from "@/lib/utils"

export const AssistantBubble: React.FC = () => {
    const { isOpen, setIsOpen } = useAssistant()

    return (
        <div className="fixed bottom-6 right-6 z-50 group">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "relative flex h-16 w-16 items-center justify-center rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-110 active:scale-90 overflow-hidden backdrop-blur-xl ring-1 ring-white/20",
                    isOpen
                        ? "bg-slate-900/80 text-white"
                        : "bg-white/30 dark:bg-slate-900/30 text-[#046379] dark:text-white border border-white/40 dark:border-slate-700/40"
                )}
            >
                {/* Pulsing background effect */}
                {!isOpen && (
                    <span className="absolute inset-0 animate-pulse bg-[#046379]/10 rounded-full"></span>
                )}

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>

                {isOpen ? (
                    <X className="h-7 w-7 relative z-10 animate-in fade-in zoom-in duration-500 rotate-0 hover:rotate-90 transition-transform" />
                ) : (
                    <Brain className="h-8 w-8 relative z-10 animate-in fade-in zoom-in duration-500 group-hover:scale-110 transition-transform" />
                )}
            </button>

            {/* Label - Premium layout */}
            {!isOpen && (
                <div className="absolute right-24 top-1/2 -translate-y-1/2 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] py-3 px-6 rounded-2xl opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 shadow-2xl pointer-events-none border border-white/10 dark:border-slate-900/10 whitespace-nowrap">
                    The Brain is Ready
                </div>
            )}
        </div>
    )
}
