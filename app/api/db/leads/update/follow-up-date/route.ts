import { NextResponse } from 'next/server';
import { DB_URL } from "@/lib/json-server/onrender/get_db_url";

const LEADS_API_URL = `${DB_URL}/leads`

export async function POST(request: Request) {
    try {
        const { id, followUpDate } = await request.json();

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'ID is required' },
                { status: 400 }
            );
        }

        const body: any = {};
        if (followUpDate) {
            body.followUpDate = followUpDate;
        } else {
            // deleting the date
            body.followUpDate = null;
        }

        const response = await fetch(`${LEADS_API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: 'Failed to update follow-up date' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'An error occurred while updating follow-up date' },
            { status: 500 }
        );
    }
}