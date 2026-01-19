"use client"

import { useEffect, useState } from "react"
import { Plus, Settings2, Trash2, Globe, Shield, RefreshCcw, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApiManagerPage() {
    const [services, setServices] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    // Editor state
    const [editingService, setEditingService] = useState<any>(null)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        fetchServices()
    }, [])

    async function fetchServices() {
        try {
            const res = await fetch("/api/admin/services")
            if (res.ok) {
                const data = await res.json()
                setServices(data)
            } else {
                setError("Failed to fetch API services.")
            }
        } catch (error) {
            setError("Connection error while fetching services.")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setIsSaving(true)
        setError("")

        const method = editingService.id ? "PATCH" : "POST"
        const url = editingService.id ? `/api/admin/services/${editingService.id}` : "/api/admin/services"

        try {
            const res = await fetch(url, {
                method,
                body: JSON.stringify(editingService)
            })
            if (res.ok) {
                setEditingService(null)
                fetchServices()
            } else {
                setError("Failed to save service configuration.")
            }
        } catch (error) {
            setError("Connection error while saving.")
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this service configuration?")) return

        try {
            const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" })
            if (res.ok) {
                fetchServices()
            }
        } catch (error) {
            setError("Failed to delete service.")
        }
    }

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">API Manager</h2>
                    <p className="text-muted-foreground">Orchestrate third-party service keys and endpoints.</p>
                </div>
                <Button
                    onClick={() => setEditingService({ name: "", environment: "PRODUCTION", status: "ACTIVE" })}
                    className="bg-[#046379] text-white gap-2"
                >
                    <Plus className="h-4 w-4" /> Add Service
                </Button>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {editingService ? (
                <Card className="border-[#046379]/20 shadow-lg">
                    <CardHeader>
                        <CardTitle>{editingService.id ? "Edit Service" : "New Service"}</CardTitle>
                        <CardDescription>Configure credentials and endpoint for {editingService.name || "a new service"}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Service Name</Label>
                                    <Input
                                        value={editingService.name || ""}
                                        onChange={e => setEditingService({ ...editingService, name: e.target.value })}
                                        placeholder="e.g. Twilio SMS, Paystack"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Environment</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={editingService.environment || "PRODUCTION"}
                                        onChange={e => setEditingService({ ...editingService, environment: e.target.value })}
                                    >
                                        <option value="SANDBOX">Sandbox</option>
                                        <option value="PRODUCTION">Production</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Endpoint URL</Label>
                                <Input
                                    value={editingService.endpoint || ""}
                                    onChange={e => setEditingService({ ...editingService, endpoint: e.target.value })}
                                    placeholder="https://api.service.com/v1"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>API Key</Label>
                                    <Input
                                        type="password"
                                        value={editingService.apiKey || ""}
                                        onChange={e => setEditingService({ ...editingService, apiKey: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>API Secret</Label>
                                    <Input
                                        type="password"
                                        value={editingService.apiSecret || ""}
                                        onChange={e => setEditingService({ ...editingService, apiSecret: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button type="submit" disabled={isSaving} className="bg-[#046379] text-white">
                                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                    Save Configuration
                                </Button>
                                <Button variant="outline" onClick={() => setEditingService(null)}>Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-[#046379]" />
                    </div>
                ) : services.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-3xl">
                        No services configured. Register your first third-party API.
                    </div>
                ) : (
                    services.map((service) => (
                        <Card key={service.id} className="hover:shadow-md transition-all border-[#046379]/10">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-lg font-bold text-[#046379]">{service.name}</CardTitle>
                                    <CardDescription className="text-xs font-mono uppercase tracking-widest">{service.environment}</CardDescription>
                                </div>
                                <div className={`h-2 w-2 rounded-full ${service.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-400"}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground mb-4 truncate italic">
                                    {service.endpoint || "No endpoint configured"}
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setEditingService(service)}
                                            className="h-8 w-8 p-0"
                                        >
                                            <Settings2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(service.id)}
                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 font-bold">
                                        {service.status}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
