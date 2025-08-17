import { NextResponse } from 'next/server';
import { DB_URL } from "@/lib/json-server/onrender/get_db_url";

const USERS_API_URL = `${DB_URL}/users`;

export async function GET() {
    try {
        const response = await fetch(USERS_API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const users = await response.json();

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { success: false, message: 'An error occurred while fetching users' },
            { status: 500 }
        );
    }
}