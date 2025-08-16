import { Lead } from '@/types/db/lead';

export async function fetchLeads(): Promise<Lead[]> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/db/leads/fetch`, {
        cache: 'no-store',
    });
    const data = await response.json();

    if (data.success) {
        return data.leads;
    } else {
        throw new Error(data.message || 'Failed to fetch leads');
    }
}
