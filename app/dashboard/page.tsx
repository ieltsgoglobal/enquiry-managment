import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead } from '@/types/db/lead';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function fetchLeads(): Promise<Lead[]> {
    const response = await fetch(`/api/db/leads/fetch-all-leads`, {
        cache: 'no-store',
    });
    const data = await response.json();

    if (data.success) {
        return data.leads;
    } else {
        throw new Error(data.message || 'Failed to fetch leads');
    }
}

export default async function DashboardPage() {
    let leads: Lead[] = [];
    let error = '';

    try {
        leads = await fetchLeads();
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
                    <ul>
                        {leads.map((lead) => (
                            <li key={lead.id} className="mb-4">
                                <p><strong>Organization:</strong> {lead.orgName}</p>
                                <p><strong>Status:</strong> {lead.status}</p>
                                <p><strong>Phone:</strong> {lead.phoneNumbers?.join(', ') || 'N/A'}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
