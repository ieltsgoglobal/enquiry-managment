"use client";

import { useState } from "react";
import { LeadWithFirebaseId, LeadStatus } from "@/types/db/lead";
import { StatusFilter } from "./StatusFilter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusModal } from "./StatusModal";
import { PhoneNumbersModal } from "./PhoneNumbersModal";
import { NotesModal } from "./NotesModal";
import { FollowUpDateModal } from "./FollowUpDateModal";
import { LastContactedModal } from "./LastContactedModal";
import { AssignToModal } from "./AssignToModal";
import { DateTimeModal } from "./DateTimeModal";
import { filterLeadsByStatus } from "../utils/lead-filter";

interface Props {
    leads: LeadWithFirebaseId[];
    users: any[];
}

export function LeadsWithFilter({ leads, users }: Props) {
    const [status, setStatus] = useState<LeadStatus | "all">("all");
    const filtered = filterLeadsByStatus(leads, status);

    return (
        <div>
            {/* Buttons to filter */}
            <StatusFilter onChange={setStatus} />

            {/* Leads Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Organization</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Phone Numbers</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Follow-Up Date</TableHead>
                        <TableHead>Last Contacted</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filtered.map((lead) => (
                        <TableRow key={lead.id}>
                            <TableCell>{lead.orgName}</TableCell>
                            <TableCell>
                                <StatusModal id={lead.firebaseId} initialStatus={lead.status} />
                            </TableCell>
                            <TableCell>
                                <PhoneNumbersModal phoneNumbers={lead.phoneNumbers} />
                            </TableCell>
                            <TableCell>
                                <NotesModal initialNotes={lead.notes} id={lead.firebaseId} />
                            </TableCell>
                            <TableCell>
                                <FollowUpDateModal id={lead.firebaseId} initialDate={lead.followUpDate} />
                            </TableCell>
                            <TableCell>
                                <LastContactedModal id={lead.firebaseId} initialDate={lead.lastContactedAt} />
                            </TableCell>
                            <TableCell>
                                <AssignToModal id={lead.firebaseId} assignedTo={lead.assignedTo} users={users} />
                            </TableCell>
                            <TableCell>
                                <DateTimeModal label="Created At" isoString={lead.createdAt} />
                            </TableCell>
                            <TableCell>
                                <DateTimeModal label="Updated At" isoString={lead.updatedAt} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}