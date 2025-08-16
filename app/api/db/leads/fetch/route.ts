import { NextResponse } from 'next/server';
import { DB_URL } from "@/lib/json-server/onrender/get_db_url";

const LEADS_API_URL = `${DB_URL}/leads`

export async function GET() {
  try {
    const response = await fetch(LEADS_API_URL);
    const leads = await response.json();

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred while fetching leads' }, { status: 500 });
  }
}
