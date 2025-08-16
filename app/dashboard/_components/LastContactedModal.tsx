"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { format } from "date-fns"

interface LastContactedModalProps {
    id: string
    initialDate?: string
}

export function LastContactedModal({ id, initialDate }: LastContactedModalProps) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const [date, setDate] = useState<string | null>(
        initialDate ? initialDate.split("T")[0] : null
    )

    // today in yyyy-MM-dd
    const todayISO = new Date().toISOString().split("T")[0]


    // pending selection in the input (doesn’t save until user clicks "Save Date")
    const [pendingDate, setPendingDate] = useState<string>(
        date ?? todayISO
    )

    const saveDate = async (value: string) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/db/leads/update/last-contacted`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    lastContactedAt: new Date(value).toISOString(),
                }),
            })

            if (!response.ok) throw new Error("Failed to save lastContactedAt")

            console.log("lastContactedAt saved successfully")
            setOpen(false)
            setDate(value)
        } catch (err) {
            console.error("Error saving lastContactedAt:", err)
        } finally {
            setLoading(false)
        }
    }



    const shortDate = date ? format(new Date(date), "dd MMM yyyy") : "N/A"

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={loading}>
                    {shortDate}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Set Last Contacted</DialogTitle>
                </DialogHeader>

                <input
                    type="date"
                    value={pendingDate}
                    className="border rounded p-2 w-full"
                    onChange={(e) => setPendingDate(e.target.value)}
                />

                <div className="flex justify-end mt-4">
                    <Button
                        onClick={() => saveDate(pendingDate)}
                        disabled={loading}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}