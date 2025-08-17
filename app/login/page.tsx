"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { Label } from "@/components/ui/label";
import { fetchUsers } from '@/lib/db/fetch/users';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // fetch all users
            const users = await fetchUsers();

            // find matching user
            const foundUser = users.find(
                (u) => u.username === username && u.password === password
            );

            if (!foundUser) {
                setError("Invalid username or password");
                return;
            }

            // 🟢 Store user in localStorage (with password now)
            localStorage.setItem("sessionUser", JSON.stringify({
                id: foundUser.id,
                username: foundUser.username,
                name: foundUser.name,
            }));

            // redirect
            router.push("/dashboard");

        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <BackgroundWrapper backgroundImage="/svg/wave-haikei.svg">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                        <div className="mb-4">
                            <Label htmlFor="username" className="block text-sm font-medium">
                                Username
                            </Label>
                            <Input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </BackgroundWrapper>
    );
}