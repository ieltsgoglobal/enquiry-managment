import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadWithFirebaseId } from '@/types/db/lead';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { fetchLeads } from './lib/fetchLeads';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatStatus, getStatusBadgeVariant } from './utils/dashboard-helper';
import { Badge } from '@/components/ui/badge';
import { PhoneNumbersModal } from './_components/PhoneNumbersModal';
import { DateTimeModal } from './_components/DateTimeModal';
import { NotesModal } from './_components/NotesModal';
import { FollowUpDateModal } from './_components/FollowUpDateModal';
import { LastContactedModal } from './_components/LastContactedModal';
import { User } from '@/types/db/users';
import { fetchUsers } from './lib/fetchUsers';
import { AssignToModal } from './_components/AssignToModal';
import { StatusModal } from './_components/StatusModal';

export default async function DashboardPage() {
    let leads: LeadWithFirebaseId[] = [];
    let users: User[] = [];
    let error = '';

    try {
        [leads, users] = await Promise.all([fetchLeads(), fetchUsers()]);
    } catch (err: any) {
        error = err.message;
    }


    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>All Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex gap-4">
                        <Link href="/insert-single-lead">
                            <Button>Add Single Lead</Button>
                        </Link>
                        <Link href="/insert-bulk-lead">
                            <Button>Add Bulk Leads</Button>
                        </Link>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
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
                            {leads.map((lead) => (
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
                </CardContent>
            </Card>
        </div>
    );
}
