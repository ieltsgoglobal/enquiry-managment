import { SessionUser } from "@/types/db/users"

export function getCurrentUser(): SessionUser | null {
    if (typeof window === "undefined") return null // SSR guard

    try {
        const raw = localStorage.getItem("sessionUser")
        if (!raw) return null
        return JSON.parse(raw) as SessionUser
    } catch (err) {
        console.error("Failed to parse sessionUser", err)
        return null
    }
}