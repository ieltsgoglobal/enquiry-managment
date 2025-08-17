"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { getCurrentUser } from "../utils/get-current-user"
import { LeadNoteHistory } from "@/types/db/lead"
import { v4 as uuid } from "uuid"
import { User } from "@/types/db/users"
import { fetchUsers } from "@/lib/db/fetch/users"

interface NotesModalProps {
    id: string
    notes: LeadNoteHistory[]
}

export function NotesModal({ id, notes = [] }: NotesModalProps) {
    const [history, setHistory] = useState<LeadNoteHistory[]>(Array.isArray(notes) ? notes : [])
    const [newNote, setNewNote] = useState("")
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const saveNote = async () => {
        if (!newNote.trim()) return

        const user = getCurrentUser()
        if (!user) {
            console.error("No logged-in user found")
            return
        }


        // new note object
        const tempNote: LeadNoteHistory = {
            id: uuid(),
            authorId: user.id,
            note: newNote,
            createdAt: new Date().toISOString(),
        }

        // build full updated array
        const fullNotes = [...history, tempNote]

        console.log("Submitting full notes:", {
            leadId: id,
            currentUser: user,
            fullNotes,
        })

        setLoading(true)
        try {
            const response = await fetch(`/api/db/leads/update/notes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    notes: fullNotes,
                }),
            })


            if (!response.ok) {
                alert("Failed to save note")
                throw new Error("Failed to save note")
            }

            setOpen(false)
            setHistory(fullNotes)
            setNewNote("")
        } catch (error) {
            console.error("Error saving note:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={loading}>
                    {history.length > 0 ? "View Notes" : "Add Notes"}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl flex flex-col">
                <DialogHeader>
                    <DialogTitle>Notes</DialogTitle>
                </DialogHeader>

                {/* History */}
                <NotesScrollArea history={history} />

                {/* New note input */}
                <div className="flex flex-col gap-1">
                    {/* Current user info */}
                    <span className="text-xs text-muted-foreground ml-1">
                        {getCurrentUser()?.name || "Unknown User"}
                    </span>

                    <div className="flex items-end gap-2">
                        <Textarea
                            placeholder="Write a note..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="flex-1 min-h-[60px]"
                        />
                        <Button onClick={saveNote} disabled={loading}>
                            {loading ? "Saving..." : "Send"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export const NotesScrollArea = ({ history }: { history: LeadNoteHistory[] }) => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const allUsers = await fetchUsers()
                setUsers(allUsers)
            } catch (err) {
                console.error("Failed to fetch users:", err)
            }
        }
        loadUsers()
    }, [])

    const getAuthorName = (authorId: string) => {
        const user = users.find((u) => u.id === authorId)
        return user ? user.name : authorId
    }

    return (
        <ScrollArea className="flex-1 max-h-[60vh] overflow-y-scroll rounded-md border p-3 mb-3">
            {/* 🔥 bigger height: 60% of viewport */}
            {history.length === 0 && (
                <p className="text-sm text-muted-foreground">No notes yet.</p>
            )}
            <div className="space-y-3">
                {history.map((h) => (
                    <Card
                        key={h.id}
                        className={`shadow-none border ${h.authorId === getCurrentUser()?.id ? "bg-muted" : ""
                            }`}
                    >
                        <CardContent className="p-3">
                            <div className="text-xs text-muted-foreground mb-1">
                                {getAuthorName(h.authorId)} •{" "}
                                {new Date(h.createdAt).toLocaleString()}
                            </div>
                            <div className="text-sm whitespace-pre-wrap">{h.note}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    )
}