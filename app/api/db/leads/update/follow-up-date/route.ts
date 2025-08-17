import { NextResponse } from 'next/server';
import { getLeadUrl } from "@/lib/json-server/realtime/get_db_url";


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

        const response = await fetch(getLeadUrl(id), {
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