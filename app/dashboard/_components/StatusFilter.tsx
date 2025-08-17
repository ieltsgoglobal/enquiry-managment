"use client";

import { useState } from "react";
import { LeadStatus } from "@/types/db/lead";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
    formatStatus,
    getStatusBadgeVariant,
} from "@/app/dashboard/utils/dashboard-helper";

interface StatusFilterProps {
    onChange: (status: LeadStatus | "all") => void;
}

export function StatusFilter({ onChange }: StatusFilterProps) {
    const [active, setActive] = useState<LeadStatus | "all">("all");

    const handleSelect = (status: LeadStatus | "all") => {
        setActive(status);
        onChange(status);
    };

    return (
        <div className="mb-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-w-[140px] justify-between">
                        {active === "all" ? (
                            "All Leads"
                        ) : (
                            <Badge variant={getStatusBadgeVariant(active as LeadStatus)}>
                                {formatStatus(active)}
                            </Badge>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 ml-3">
                    <DropdownMenuItem onClick={() => handleSelect("all")}>
                        All Leads
                    </DropdownMenuItem>
                    {Object.values(LeadStatus).map((s) => (
                        <DropdownMenuItem
                            key={s}
                            onClick={() => handleSelect(s)}
                            className="flex items-center justify-between"
                        >
                            <span>{formatStatus(s)}</span>
                            <Badge variant={getStatusBadgeVariant(s)} className="ml-2">
                                {formatStatus(s)}
                            </Badge>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}