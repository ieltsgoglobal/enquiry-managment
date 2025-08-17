// types/leads.ts

// All possible lead statuses
export enum LeadStatus {
    NotInterested = "not_interested",
    Purchased = "purchased",
    Prospective = "prospective_leads",
    HotLead = "hot_lead",
    NotPickingUp = "not_picking_up",
    SwitchedOff = "switched_off",
    WrongNumber = "wrong_number",
    Dead = "dead",
    New = "new",
}

// Lead structure
export interface Lead {
    id: string;                // uuid ID
    orgName: string;           // Org Name
    websiteUrl?: string;       // Website URL (optional)
    phoneUrl?: string;         // Click-to-call link (optional)
    phoneNumbers?: string[];      // Plain phone number
    notes?: string;            // Notes (MDX/Markdown)
    status: LeadStatus;        // Current status
    followUpDate?: string;     // ISO date for follow-up reminder
    lastContactedAt?: string;   // ISO datetime of last contact
    assignedTo?: string;        // User ID (sales rep assigned)
    createdAt: string;         // ISO datetime when added
    updatedAt: string;         // ISO datetime last updated
}

export interface LeadWithFirebaseId extends Lead {
    firebaseId: string;   // always present once fetched
}