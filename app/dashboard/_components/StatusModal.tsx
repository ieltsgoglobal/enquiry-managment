"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LeadStatus } from "@/types/db/lead";
import { Badge } from "@/components/ui/badge";
import { formatStatus, getStatusBadgeVariant } from "@/app/dashboard/utils/dashboard-helper";

interface StatusModalProps {
    id: string;
    initialStatus: LeadStatus;
}

export function StatusModal({ id, initialStatus }: StatusModalProps) {
    const [status, setStatus] = useState<LeadStatus>(initialStatus);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/db/leads/update/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firebaseKey: id, status }),
            });

            if (res.ok) {
                setOpen(false); // ✅ close after success
            }
        } catch (err) {
            console.error("Failed to update status", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-0 text-left">
                    <Badge variant={getStatusBadgeVariant(status)}>
                        {formatStatus(status)}
                    </Badge>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as LeadStatus)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        {Object.values(LeadStatus).map((s) => (
                            <option key={s} value={s}>
                                {formatStatus(s)}
                            </option>
                        ))}
                    </select>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}