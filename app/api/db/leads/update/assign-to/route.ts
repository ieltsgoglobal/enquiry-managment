import { NextResponse } from "next/server";
import { getLeadUrl } from "@/lib/json-server/realtime/get_db_url";

export async function POST(req: Request) {
    try {
        const { id, assignedTo } = await req.json();

        if (!id || !assignedTo) {
            return NextResponse.json(
                { success: false, message: "Missing id or assignedTo" },
                { status: 400 }
            );
        }

        // PATCH the lead in JSON server
        const response = await fetch(getLeadUrl(id), {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assignedTo }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: "Failed to update lead in DB" },
                { status: 500 }
            );
        }

        const updatedLead = await response.json();

        return NextResponse.json({ success: true, lead: updatedLead });
    } catch (error) {
        console.error("AssignTo API Error:", error);
        return NextResponse.json(
            { success: false, message: "Server error assigning lead" },
            { status: 500 }
        );
    }
}