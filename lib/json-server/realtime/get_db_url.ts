// /lib/json-server/onrender/get_db_url.ts

export const DB_URL =
    "https://enquiry-managment-default-rtdb.asia-southeast1.firebasedatabase.app";

// Users endpoint
export const DB_URL_USERS = `${DB_URL}/users.json`;

// Leads endpoint
export const DB_URL_LEADS = `${DB_URL}/leads.json`;

// Single lead by id
export const getLeadUrl = (firebaseKey: string) => `${DB_URL}/leads/${firebaseKey}.json`;