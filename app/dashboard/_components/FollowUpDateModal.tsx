// components/FollowUpDateModal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { format } from "date-fns"

interface FollowUpDateModalProps {
    id: string
    initialDate?: string
}

export function FollowUpDateModal({ id, initialDate }: FollowUpDateModalProps) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    // today in yyyy-MM-dd
    const todayISO = new Date().toISOString().split("T")[0]

    // state can be a valid ISO date string or null (for "N/A")
    const [date, setDate] = useState<string | null>(
        initialDate ? initialDate.split("T")[0] : null
    )

    // pending selection in the input (doesn’t save until user clicks "Save Date")
    const [pendingDate, setPendingDate] = useState<string>(
        date ?? todayISO
    )

    const saveDate = async (value: string | null) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/db/leads/update/follow-up-date`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, followUpDate: value }),
            })

            if (!response.ok) throw new Error("Failed to save follow-up date")

            console.log("Follow-up date saved successfully")
            setDate(value)
            setOpen(false)
        } catch (err) {
            console.error("Error saving follow-up date:", err)
        } finally {
            setLoading(false)
        }
    }

    // What to show on the button
    const shortDate = date
        ? format(new Date(date), "dd MMM yyyy")
        : "N/A"

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={loading}>
                    {shortDate}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Set Follow-Up Date</DialogTitle>
                </DialogHeader>
                <input
                    type="date"
                    value={pendingDate}
                    className="border rounded p-2 w-full"
                    onChange={(e) => setPendingDate(e.target.value)}
                />
                <div className="flex gap-2">
                    <Button
                        className="flex-1"
                        disabled={loading}
                        onClick={() => saveDate(pendingDate)}
                    >
                        Save Date
                    </Button>
                    {date && (
                        <Button
                            variant="destructive"
                            className="flex-1"
                            disabled={loading}
                            onClick={() => saveDate(null)}
                        >
                            Clear Date
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}