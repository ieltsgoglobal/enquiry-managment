import { getBaseUrl } from '@/lib/api-base';
import { LeadWithFirebaseId } from '@/types/db/lead';

export async function fetchLeads(): Promise<LeadWithFirebaseId[]> {
    const baseUrl = getBaseUrl();

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
