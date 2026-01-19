"use client"

import { useEffect, useState } from "react"
import { Palette, Save, Loader2, Check, Layout, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ThemeEditorPage() {
    const [themes, setThemes] = useState<any[]>([])
    const [activeTheme, setActiveTheme] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchThemes()
    }, [])

    async function fetchThemes() {
        try {
            const res = await fetch("/api/admin/theme")
            if (res.ok) {
                const data = await res.json()
                setThemes(data.themes || [])
                setActiveTheme(data.activeTheme)
            }
        } catch (error) {
            setError("Failed to load themes.")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSave(theme: any) {
        setIsSaving(true)
        setError("")

        try {
            const res = await fetch("/api/admin/theme", {
                method: "POST",
                body: JSON.stringify(theme)
            })
            if (res.ok) {
                fetchThemes()
            } else {
                setError("Failed to save theme.")
            }
        } catch (error) {
            setError("Connection error.")
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#046379]" /></div>

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Theme Manager</h2>
                <p className="text-muted-foreground">Control the visual aesthetic of the national portal.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map(theme => (
                    <Card key={theme.id} className={`relative overflow-hidden border-2 ${theme.isDefault ? "border-[#046379]" : "border-slate-100"}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex justify-between items-center">
                                {theme.name}
                                {theme.isDefault && <Check className="h-4 w-4 text-[#046379]" />}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-4 gap-2 h-12 rounded-xl border border-slate-100 overflow-hidden">
                                <div style={{ backgroundColor: theme.primary }} className="h-full" title="Primary" />
                                <div style={{ backgroundColor: theme.secondary }} className="h-full" title="Secondary" />
                                <div style={{ backgroundColor: theme.accent }} className="h-full" title="Accent" />
                                <div style={{ backgroundColor: theme.background }} className="h-full" title="Background" />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-mono">{theme.primary}</span>
                                    <span className="text-slate-400">Primary</span>
                                </div>
                                <div className="flex gap-2">
                                    {!theme.isDefault && (
                                        <Button
                                            onClick={() => handleSave({ ...theme, isDefault: true })}
                                            className="flex-1 bg-[#046379] h-8 text-xs font-bold"
                                        >
                                            Set Default
                                        </Button>
                                    )}
                                    <Button variant="outline" className="h-8 text-xs font-bold" onClick={() => setActiveTheme(theme)}>
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {activeTheme && (
                <Card className="max-w-4xl border-[#046379]/20 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-[#046379]" /> Theme Editor: {activeTheme.name}</CardTitle>
                        <CardDescription>Adjust the primary descriptors and hex codes for this theme.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(activeTheme); }}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Theme Name</Label>
                                    <Input value={activeTheme.name} onChange={e => setActiveTheme({ ...activeTheme, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Primary Color (Institutional)</Label>
                                    <div className="flex gap-2">
                                        <div className="h-10 w-10 shrink-0 rounded-xl" style={{ backgroundColor: activeTheme.primary }} />
                                        <Input value={activeTheme.primary} onChange={e => setActiveTheme({ ...activeTheme, primary: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Secondary Color (Operations)</Label>
                                    <div className="flex gap-2">
                                        <div className="h-10 w-10 shrink-0 rounded-xl" style={{ backgroundColor: activeTheme.secondary }} />
                                        <Input value={activeTheme.secondary} onChange={e => setActiveTheme({ ...activeTheme, secondary: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Accent Color (Alerts/Actions)</Label>
                                    <div className="flex gap-2">
                                        <div className="h-10 w-10 shrink-0 rounded-xl" style={{ backgroundColor: activeTheme.accent }} />
                                        <Input value={activeTheme.accent} onChange={e => setActiveTheme({ ...activeTheme, accent: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" disabled={isSaving} className="bg-[#046379] text-white">
                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                Save Theme
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
