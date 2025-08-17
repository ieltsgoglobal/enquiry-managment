import { NextResponse } from 'next/server';
import { DB_URL_LEADS } from "@/lib/json-server/realtime/get_db_url";

const LEADS_API_URL = DB_URL_LEADS

export async function GET() {
  try {
    const response = await fetch(LEADS_API_URL);
    const data = await response.json();

    if (!data) {
      return NextResponse.json({ success: true, leads: [] });
    }

    // 🔑 Normalize Firebase object -> array
    const leads = Object.entries(data).map(([firebaseId, lead]) => ({
      firebaseId, // Firebase push key
      ...(lead as any),
    }));

    console.log("leads", leads)

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred while fetching leads' }, { status: 500 });
  }
}
