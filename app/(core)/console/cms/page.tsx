"use client"

import { useEffect, useState } from "react"
import { Save, Loader2, Globe, Mail, Phone, MapPin, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function GeneralSettingsPage() {
    const [settings, setSettings] = useState<any>({
        siteName: "",
        siteDescription: "",
        contactEmail: "",
        contactPhone: "",
        contactAddress: "",
        socialTwitter: "",
        socialFacebook: "",
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        fetchSettings()
    }, [])

    async function fetchSettings() {
        try {
            const res = await fetch("/api/admin/settings")
            if (res.ok) {
                const data = await res.json()
                setSettings((prev: any) => ({ ...prev, ...data }))
            }
        } catch (error) {
            setError("Failed to load settings.")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setIsSaving(true)
        setError("")
        setSuccess(false)

        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                body: JSON.stringify(settings)
            })
            if (res.ok) {
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
            } else {
                setError("Failed to save settings.")
            }
        } catch (error) {
            setError("Connection error.")
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#046379]" /></div>
    }

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Institutional Branding</h2>
                <p className="text-muted-foreground">Manage the public identity and contact touchpoints of the platform.</p>
            </div>

            <form onSubmit={handleSave} className="max-w-4xl space-y-6">
                {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
                {success && <Alert className="bg-emerald-50 border-emerald-200"><AlertDescription className="text-emerald-700">Settings updated successfully!</AlertDescription></Alert>}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-[#046379]" /> Identity</CardTitle>
                        <CardDescription>The core name and description used across the platform and meta tags.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Site Name</Label>
                            <Input value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Mission Statement / Description</Label>
                            <Input value={settings.siteDescription} onChange={e => setSettings({ ...settings, siteDescription: e.target.value })} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-[#046379]" /> Official Contact</CardTitle>
                        <CardDescription>Used in the footer and contact sections.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2"><Mail className="h-3 w-3" /> Secretary Email</Label>
                            <Input value={settings.contactEmail} onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2"><Phone className="h-3 w-3" /> Support Hotline</Label>
                            <Input value={settings.contactPhone} onChange={e => setSettings({ ...settings, contactPhone: e.target.value })} />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label>Physical Headquarters Address</Label>
                            <Input value={settings.contactAddress} onChange={e => setSettings({ ...settings, contactAddress: e.target.value })} />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" className="bg-[#046379] text-white px-8" disabled={isSaving}>
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Publish Updates
                    </Button>
                </div>
            </form>
        </div>
    )
}
