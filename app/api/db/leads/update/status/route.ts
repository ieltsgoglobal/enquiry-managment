import { NextResponse } from "next/server";
import { getLeadUrl } from "@/lib/json-server/realtime/get_db_url";

export async function POST(req: Request) {
    try {
        const { firebaseKey, status } = await req.json();

        if (!firebaseKey || !status) {
            return NextResponse.json(
                { success: false, message: "Missing firebaseKey or status" },
                { status: 400 }
            );
        }

        // PATCH the lead in JSON server
        const response = await fetch(getLeadUrl(firebaseKey), {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
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
        console.error("Status API Error:", error);
        return NextResponse.json(
            { success: false, message: "Server error updating status" },
            { status: 500 }
        );
    }
}