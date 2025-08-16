import { NextResponse } from 'next/server';

const LEADS_API_URL = "https://json-server-mivt.onrender.com/leads"

export async function GET() {
  try {
    const response = await fetch(LEADS_API_URL);
    const leads = await response.json();

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred while fetching leads' }, { status: 500 });
  }
}
