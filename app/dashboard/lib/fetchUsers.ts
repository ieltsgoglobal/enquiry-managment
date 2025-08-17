// lib/fetchUsers.ts
import { getBaseUrl } from '@/lib/api-base';
import { User } from '@/types/db/users';

export async function fetchUsers(): Promise<User[]> {
    const baseUrl = getBaseUrl();

    const response = await fetch(`${baseUrl}/api/db/users/fetch`, {
        cache: "force-cache",
    });
    const data = await response.json();

    if (data.success) {
        return data.users;
    } else {
        throw new Error(data.message || 'Failed to fetch users');
    }
}