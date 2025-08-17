import { LeadWithFirebaseId } from "@/types/db/lead";
import { LeadsWithFilter } from "./_components/LeadsWithFilter";
import { User } from "@/types/db/users";
import { fetchLeads } from "../../lib/db/fetch/leads";
import { fetchUsers } from "../../lib/db/fetch/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
    let leads: LeadWithFirebaseId[] = [];
    let users: User[] = [];
    let error = "";

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

                    {/* ✅ All filtering + table in one place */}
                    <LeadsWithFilter leads={leads} users={users} />
                </CardContent>
            </Card>
        </div>
    );
}