import { NextResponse } from "next/server";
import { getLeadUrl } from "@/lib/json-server/realtime/get_db_url";

export async function POST(req: Request) {
    try {
        const { id, notes } = await req.json();  // ✅ accept the full array

        if (!id || !Array.isArray(notes)) {
            return NextResponse.json(
                { success: false, message: "Missing id or notes array" },
                { status: 400 }
            );
        }

        // 🔥 Save full notes array to JSON server
        const response = await fetch(getLeadUrl(id), {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                notes,  // ✅ overwrite with the full array
            }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: "Failed to update lead notes in DB" },
                { status: 500 }
            );
        }

        const updatedLead = await response.json();

        return NextResponse.json({
            success: true,
            notes,        // return the full updated notes
            lead: updatedLead,
        });
    } catch (error) {
        console.error("Notes API Error:", error);
        return NextResponse.json(
            { success: false, message: "Server error updating notes" },
            { status: 500 }
        );
    }
}