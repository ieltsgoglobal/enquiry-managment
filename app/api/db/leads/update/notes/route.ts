import { NextResponse } from 'next/server';
import { getLeadUrl } from "@/lib/json-server/realtime/get_db_url";

export async function POST(request: Request) {

    try {
        const { id, notes } = await request.json();

        if (!id || !notes) {
            return NextResponse.json({ success: false, message: 'ID and notes are required' }, { status: 400 });
        }

        const response = await fetch(getLeadUrl(id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notes }),
        });

        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Failed to update notes' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'An error occurred while updating notes' }, { status: 500 });
    }
}