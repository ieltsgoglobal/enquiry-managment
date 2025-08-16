import { NextResponse } from 'next/server';

const LEADS_API_URL = "https://json-server-mivt.onrender.com/leads"

export async function POST(request: Request) {
  try {
    const newLead = await request.json();

    const response = await fetch(LEADS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLead),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to insert lead' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred while inserting the lead' }, { status: 500 });
  }
}
