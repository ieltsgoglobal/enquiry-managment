// lib/dashboardHelpers.ts

import { VariantProps } from "class-variance-authority"
import { badgeVariants } from "@/components/ui/badge"
import { LeadStatus } from "@/types/db/lead"

/**
 * Returns the right badge variant based on lead status
 */

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

export function formatStatus(status: LeadStatus): string {
    switch (status) {
        case LeadStatus.NotInterested: return "Not Interested"
        case LeadStatus.Purchased: return "Purchased"
        case LeadStatus.Prospective: return "Prospective Lead"
        case LeadStatus.HotLead: return "Hot Lead"
        case LeadStatus.NotPickingUp: return "Not Picking Up"
        case LeadStatus.SwitchedOff: return "Switched Off"
        case LeadStatus.WrongNumber: return "Wrong Number"
        case LeadStatus.Dead: return "Dead"
        case LeadStatus.New: return "New"
        default: return status
    }
}

export function getStatusBadgeVariant(status: LeadStatus): BadgeVariant {
    switch (status) {
        case LeadStatus.Purchased:
            return "success"
        case LeadStatus.HotLead:
        case LeadStatus.Prospective:
            return "yellow"
        case LeadStatus.New:
            return "blue"
        case LeadStatus.NotInterested:
        case LeadStatus.Dead:
        case LeadStatus.WrongNumber:
            return "destructive"
        case LeadStatus.NotPickingUp:
        case LeadStatus.SwitchedOff:
            return "outline"
        default:
            return "default"
    }
}




