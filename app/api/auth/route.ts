import { NextResponse } from "next/server";
import { DB_URL } from "@/lib/json-server/onrender/get_db_url";

const USERS_API_URL = `${DB_URL}/users`

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const response = await fetch(
            `${USERS_API_URL}?username=${username}&password=${password}`
        );
        const users = await response.json();

        if (users.length > 0) {
            return NextResponse.json({ success: true, user: users[0] });
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "An error occurred" },
            { status: 500 }
        );
    }
}