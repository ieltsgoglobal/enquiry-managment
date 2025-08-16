// components/PhoneNumbersModal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PhoneNumbersModalProps {
    phoneNumbers?: string[]
}

export function PhoneNumbersModal({ phoneNumbers }: PhoneNumbersModalProps) {
    if (!phoneNumbers || phoneNumbers.length === 0) {
        return <span>N/A</span>
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    View Numbers
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Phone Numbers</DialogTitle>
                </DialogHeader>
                <ul className="list-disc pl-6 space-y-2">
                    {phoneNumbers.map((num, idx) => (
                        <li key={idx} className="text-sm">
                            {num}
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    )
}