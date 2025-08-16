// lib/api-base.ts

export function getBaseUrl() {
    if (typeof window !== "undefined") {
        // If running in the browser, just use relative path
        return "";
    }

    // If running server-side (SSR)
    if (process.env.NODE_ENV === "production") {
        return "https://enquiry-managment.vercel.app";
    }

    return "http://localhost:3000";
}