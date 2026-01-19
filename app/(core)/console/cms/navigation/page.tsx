"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, MoveUp, MoveDown, Layout, Link2, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NavigationManagerPage() {
    const [items, setItems] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")

    const [editingItem, setEditingItem] = useState<any>(null)

    useEffect(() => {
        fetchNavigation()
    }, [])

    async function fetchNavigation() {
        try {
            const res = await fetch("/api/admin/navigation")
            if (res.ok) {
                const data = await res.json()
                setItems(data)
            }
        } catch (error) {
            setError("Failed to load navigation.")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setIsSaving(true)
        setError("")

        try {
            const res = await fetch("/api/admin/navigation", {
                method: "POST",
                body: JSON.stringify(editingItem)
            })
            if (res.ok) {
                setEditingItem(null)
                fetchNavigation()
            } else {
                setError("Failed to save navigation item.")
            }
        } catch (error) {
            setError("Connection error.")
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string) {
        try {
            const res = await fetch(`/api/admin/navigation?id=${id}`, { method: "DELETE" })
            if (res.ok) {
                fetchNavigation()
            }
        } catch (error) {
            setError("Failed to delete.")
        }
    }

    const headerItems = items.filter(i => i.group === "HEADER")
    const footerItems = items.filter(i => i.group.startsWith("FOOTER"))

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Navigation Manager</h2>
                    <p className="text-muted-foreground">Manage global header and footer links.</p>
                </div>
                <Button onClick={() => setEditingItem({ title: "", href: "", order: items.length, group: "HEADER" })} className="bg-[#046379] text-white gap-2">
                    <Plus className="h-4 w-4" /> Add Link
                </Button>
            </div>

            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

            {editingItem && (
                <Card className="border-[#046379]/30">
                    <CardHeader>
                        <CardTitle>{editingItem.id ? "Edit Link" : "New Link"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                            <div className="space-y-2">
                                <Label>Label</Label>
                                <Input value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} placeholder="e.g. About Us" required />
                            </div>
                            <div className="space-y-2">
                                <Label>URL Path</Label>
                                <Input value={editingItem.href} onChange={e => setEditingItem({ ...editingItem, href: e.target.value })} placeholder="/about" required />
                            </div>
                            <div className="space-y-2">
                                <Label>Group</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={editingItem.group}
                                    onChange={e => setEditingItem({ ...editingItem, group: e.target.value })}
                                >
                                    <option value="HEADER">Header Nav</option>
                                    <option value="FOOTER_MAIN">Footer Primary</option>
                                    <option value="FOOTER_LEGAL">Footer Legal</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="bg-[#046379] text-white flex-1" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                                    Save
                                </Button>
                                <Button variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Layout className="h-5 w-5 text-[#046379]" /> Header Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {headerItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <Link2 className="h-4 w-4 text-slate-400" />
                                    <div>
                                        <p className="font-bold text-sm text-[#046379]">{item.title}</p>
                                        <p className="text-[10px] text-slate-500 font-mono italic">{item.href}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm" onClick={() => setEditingItem(item)} className="h-8 w-8 p-0"><Settings2 className="h-3.5 w-3.5" /></Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="h-8 w-8 p-0 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Layout className="h-5 w-5 text-emerald-600" /> Footer Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {footerItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <Link2 className="h-4 w-4 text-slate-400" />
                                    <div>
                                        <p className="font-bold text-sm text-emerald-700">{item.title}</p>
                                        <p className="text-[10px] text-slate-500 font-mono italic">{item.href} ({item.group.split("_")[1]})</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm" onClick={() => setEditingItem(item)} className="h-8 w-8 p-0"><Settings2 className="h-3.5 w-3.5" /></Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="h-8 w-8 p-0 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

import { Settings2 } from "lucide-react"
