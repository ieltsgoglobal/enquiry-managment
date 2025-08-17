// utils/filter-leads.ts
import { LeadWithFirebaseId, LeadStatus } from "@/types/db/lead";

/**
 * Filters a list of leads by status.
 * @param leads - Array of leads
 * @param status - Status to filter by ("all" will return everything)
 */
export function filterLeadsByStatus(
    leads: LeadWithFirebaseId[],
    status: LeadStatus | "all"
): LeadWithFirebaseId[] {
    if (status === "all") return leads;
    return leads.filter((lead) => lead.status === status);
}