import "../styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { AssistantProvider } from "@/components/assistant/AssistantProvider"
import { AssistantBubble } from "@/components/assistant/AssistantBubble"
import { AssistantChat } from "@/components/assistant/AssistantChat"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/components/providers/session-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

import { prisma } from "@/lib/prisma"
import { hexToHsl } from "@/lib/utils"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Fetch dynamic theme
  const themes = await prisma.themeConfig.findMany()
  const activeTheme = themes.find(t => t.isDefault) || themes[0] || {
    primary: "#046379",
    secondary: "#01A651",
    accent: "#F59E0B",
    background: "#F8FAFC"
  }

  const themeVars = {
    "--primary": hexToHsl(activeTheme.primary),
    "--secondary": hexToHsl(activeTheme.secondary),
    "--accent": hexToHsl(activeTheme.accent),
    "--background-dynamic": activeTheme.background, // Keep background as hex for now or convert too
  } as React.CSSProperties

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
          style={themeVars}
          suppressHydrationWarning
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>
              <AssistantProvider>
                <div className="relative flex min-h-screen flex-col">
                  <div className="flex-1">{children}</div>
                </div>
                <AssistantBubble />
                <AssistantChat />
                <Toaster />
                <TailwindIndicator />
              </AssistantProvider>
            </SessionProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
