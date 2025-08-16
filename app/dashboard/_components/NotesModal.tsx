// components/NotesModal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MdxEditor } from "./MdxEditor"
import { useState } from "react"

interface NotesModalProps {
    initialNotes?: string
    id: string
}

export function NotesModal({ initialNotes, id }: NotesModalProps) {
    const [notes, setNotes] = useState(initialNotes)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const saveNotes = async (value: string) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/db/leads/update/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, notes: value })
            })

            if (!response.ok) {
                throw new Error("Failed to save notes")
            }

            console.log("Notes saved successfully")
            setNotes(value)
            setOpen(false)
        } catch (error) {
            console.error("Error saving notes:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={loading}>
                    {initialNotes ? "View Notes" : "Add Notes"}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Notes</DialogTitle>
                </DialogHeader>
                <MdxEditor
                    initialValue={notes}
                    onSave={saveNotes}
                />
            </DialogContent>
        </Dialog>
    )
}