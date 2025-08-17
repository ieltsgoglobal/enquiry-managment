"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { User } from "@/types/db/users"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface AssignToModalProps {
    id: string
    assignedTo?: string
    users: User[]
}

export function AssignToModal({ id, assignedTo, users }: AssignToModalProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pendingUser, setPendingUser] = useState(assignedTo || "")

    const saveAssignedTo = async (value: string) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/db/leads/update/assign-to`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    assignedTo: value,
                }),
            })

            if (!response.ok) throw new Error("Failed to assign lead")

            console.log("Lead assigned successfully")
            setOpen(false)
        } catch (err) {
            console.error("Error assigning lead:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={loading}>
                    {pendingUser
                        ? users.find((u) => u.id === pendingUser)?.name || pendingUser
                        : "Assign"}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Assign Lead</DialogTitle>
                </DialogHeader>

                <Select value={pendingUser} onValueChange={setPendingUser}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex justify-end mt-4">
                    <Button
                        onClick={() => saveAssignedTo(pendingUser)}
                        disabled={loading || !pendingUser}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}