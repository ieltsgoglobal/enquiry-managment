// types/db/user.ts

export interface User {
    id: string;
    username: string;
    password: string;
    name: string;
}


// 🟢 SessionUser is User without password
export type SessionUser = Omit<User, "password">;