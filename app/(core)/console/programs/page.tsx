"use client"

import { useEffect, useState } from "react"
import { Plus, Users, Calendar, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProgramsPage() {
    const [programs, setPrograms] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
    
    // Form State
    const [newName, setNewName] = useState("")
    const [newType, setNewType] = useState("CASH_TRANSFER")
    const [newDesc, setNewDesc] = useState("")

    useEffect(() => {
        fetchPrograms()
    }, [])

    async function fetchPrograms() {
        try {
            const res = await fetch("/api/programs")
            if (res.ok) {
                const data = await res.json()
                setPrograms(data)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault()
        try {
            const res = await fetch("/api/programs", {
                method: "POST",
                body: JSON.stringify({
                    name: newName,
                    type: newType,
                    description: newDesc,
                    startDate: new Date().toISOString(),
                })
            })
            if (res.ok) {
                setShowCreate(false)
                setNewName("")
                fetchPrograms() // Refresh
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Intervention Pathways</h2>
                    <p className="text-muted-foreground">Manage automated aid programs and beneficiary flows.</p>
                </div>
                <Button onClick={() => setShowCreate(!showCreate)} className="bg-[#046379] text-white gap-2">
                    <Plus className="h-4 w-4" /> New Program
                </Button>
            </div>

            {showCreate && (
                <Card className="bg-slate-50 border-dashed border-2">
                    <CardHeader>
                        <CardTitle>Launch New Intervention</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreate} className="space-y-4 max-w-md">
                            <div className="grid gap-2">
                                <Label>Program Name</Label>
                                <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Flood Relief 2026" required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Type</Label>
                                <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={newType} 
                                    onChange={e => setNewType(e.target.value)}
                                >
                                    <option value="CASH_TRANSFER">Cash Transfer (CVA)</option>
                                    <option value="SKILLS_TRAINING">Skills Training</option>
                                    <option value="AGRO_INPUT">Agro Input Support</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Targeting logic..." />
                            </div>
                            <Button type="submit">Launch Program</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                    <Card key={program.id} className="hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle className="text-lg font-bold text-[#046379]">{program.name}</CardTitle>
                                <CardDescription className="text-xs font-mono mt-1">{program.id}</CardDescription>
                            </div>
                            {program.type === "CASH_TRANSFER" ? <Activity className="h-5 w-5 text-emerald-600" /> : 
                             program.type === "SKILLS_TRAINING" ? <Users className="h-5 w-5 text-blue-600" /> :
                             <Calendar className="h-5 w-5 text-amber-600" />}
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground mt-2 mb-4">
                                {program.description || "No description provided."}
                            </div>
                            <div className="flex items-center gap-4 text-xs font-medium">
                                <span className="bg-slate-100 px-2 py-1 rounded-full text-slate-700">
                                    {program.type.replace("_", " ")}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {program._count?.enrollments || 0} Enrolled
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
             {programs.length === 0 && !isLoading && (
                <div className="text-center py-12 text-muted-foreground">
                    No active programs found. Create one to start orchestrating.
                </div>
            )}
        </div>
    )
}
