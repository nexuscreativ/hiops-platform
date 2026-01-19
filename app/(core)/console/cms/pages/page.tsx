"use client"

import { useEffect, useState } from "react"
import { Plus, FileText, Globe, Loader2, Save, Trash2, Edit3, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PageManagerPage() {
    const [pages, setPages] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")

    const [editingPage, setEditingPage] = useState<any>(null)

    useEffect(() => {
        fetchPages()
    }, [])

    async function fetchPages() {
        try {
            const res = await fetch("/api/admin/pages")
            if (res.ok) {
                const data = await res.json()
                setPages(data)
            }
        } catch (error) {
            setError("Failed to load pages.")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setIsSaving(true)
        setError("")

        try {
            const res = await fetch("/api/admin/pages", {
                method: "POST",
                body: JSON.stringify(editingPage)
            })
            if (res.ok) {
                setEditingPage(null)
                fetchPages()
            } else {
                setError("Failed to save page.")
            }
        } catch (error) {
            setError("Connection error.")
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this page? This cannot be undone.")) return
        try {
            const res = await fetch(`/api/admin/pages?id=${id}`, { method: "DELETE" })
            if (res.ok) fetchPages()
        } catch (error) {
            setError("Failed to delete.")
        }
    }

    if (isLoading) return <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#046379]" /></div>

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Institutional Page Manager</h2>
                    <p className="text-muted-foreground">Draft and publish official platform pages.</p>
                </div>
                <Button onClick={() => setEditingPage({ title: "", slug: "", content: { blocks: [] }, published: false })} className="bg-[#046379] text-white gap-2">
                    <Plus className="h-4 w-4" /> New Page
                </Button>
            </div>

            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

            {editingPage && (
                <Card className="border-[#046379]/30 shadow-2xl">
                    <CardHeader>
                        <CardTitle>{editingPage.id ? "Edit Page" : "Draft New Page"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Page Title</Label>
                                    <Input value={editingPage.title} onChange={e => setEditingPage({ ...editingPage, title: e.target.value })} placeholder="e.g. Humanitarian Policy" required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Slug (URL Segment)</Label>
                                    <Input value={editingPage.slug} onChange={e => setEditingPage({ ...editingPage, slug: e.target.value })} placeholder="humanitarian-policy" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Content Editor (JSON Prototype)</Label>
                                <textarea
                                    className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#046379]"
                                    value={JSON.stringify(editingPage.content, null, 2)}
                                    onChange={e => {
                                        try {
                                            const val = JSON.parse(e.target.value)
                                            setEditingPage({ ...editingPage, content: val })
                                        } catch (e) { }
                                    }}
                                />
                                <p className="text-[10px] text-muted-foreground italic">Note: Advanced block editor planned for next phase. Edit raw JSON schema for now.</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={editingPage.published}
                                    onChange={e => setEditingPage({ ...editingPage, published: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300 text-[#046379] focus:ring-[#046379]"
                                />
                                <Label htmlFor="published">Publish Page Immediately</Label>
                            </div>

                            <div className="flex gap-3">
                                <Button type="submit" className="bg-[#046379] text-white" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                    Save Official Copy
                                </Button>
                                <Button variant="outline" onClick={() => setEditingPage(null)}>Discard</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {pages.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground border-2 border-dashed rounded-3xl">
                        No pages created yet.
                    </div>
                ) : (
                    pages.map(page => (
                        <div key={page.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <FileText className={`h-8 w-8 ${page.published ? "text-[#046379]" : "text-slate-300"}`} />
                                <div>
                                    <h3 className="font-bold text-slate-800">{page.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                                        <Globe className="h-3 w-3" /> /{page.slug}
                                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-slate-100 rounded">
                                            {page.published ? "Live" : "Draft"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEditingPage(page)} className="bg-slate-50 hover:bg-slate-100 text-[#046379] font-bold">
                                    <Edit3 className="h-4 w-4 mr-2" /> Edit
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(page.id)} className="text-red-500 hover:bg-red-50 font-bold">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
