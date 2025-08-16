import { NextResponse } from "next/server";

const LEADS_API_URL = "https://json-server-mivt.onrender.com/leads";

export async function POST(request: Request) {
    try {
        const leads = await request.json();

        if (!Array.isArray(leads)) {
            return NextResponse.json(
                { success: false, message: "Expected an array of leads" },
                { status: 400 }
            );
        }

        // Insert all leads in parallel
        await Promise.all(
            leads.map((lead) =>
                fetch(LEADS_API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(lead),
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Bulk insert failed:", error);
        return NextResponse.json(
            { success: false, message: "Error while inserting leads" },
            { status: 500 }
        );
    }
}