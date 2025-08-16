// components/DateTimeModal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

interface DateTimeModalProps {
    label: string
    isoString?: string
}

export function DateTimeModal({ label, isoString }: DateTimeModalProps) {
    if (!isoString) return <span>N/A</span>

    const shortDate = format(new Date(isoString), "dd MMM yyyy") // e.g. 16 Aug 2025

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">{shortDate}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 text-sm">
                    <p><strong>Full Date:</strong> {new Date(isoString).toLocaleString()}</p>
                    <p><strong>Raw ISO:</strong> {isoString}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}