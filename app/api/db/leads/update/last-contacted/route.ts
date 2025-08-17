// app/api/db/leads/update/last-contacted/route.ts
import { NextResponse } from "next/server"
import { DB_URL_LEADS, getLeadUrl } from "@/lib/json-server/realtime/get_db_url";

const LEADS_API_URL = DB_URL_LEADS

export async function POST(request: Request) {
    try {
        const { id, lastContactedAt } = await request.json()

        if (!id || !lastContactedAt) {
            return NextResponse.json(
                { success: false, message: "ID and lastContactedAt are required" },
                { status: 400 }
            )
        }

        const response = await fetch(getLeadUrl(id), {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lastContactedAt }),
        })

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: "Failed to update lastContactedAt" },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "An error occurred while updating lastContactedAt" },
            { status: 500 }
        )
    }
}