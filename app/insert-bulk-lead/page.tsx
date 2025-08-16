"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lead } from '@/types/db/lead';

export default function InsertBulkLeadPage() {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleBulkInsert = async () => {
        try {
            const leads: Lead[] = JSON.parse(jsonInput);

            const response = await fetch('/api/db/leads/insert/bulk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leads),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/dashboard');
            } else {
                setError(data.message || 'Failed to insert leads');
            }
        } catch (err) {
            setError('Invalid JSON or an error occurred while inserting leads');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Insert Bulk Leads</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="jsonInput" className="block text-sm font-medium">
                    Paste JSON Here
                </label>
                <Textarea
                    id="jsonInput"
                    value={jsonInput}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJsonInput(e.target.value)}
                    placeholder="Paste your JSON array of leads here"
                    rows={10}
                    className="w-full"
                />
            </div>
            <Button onClick={handleBulkInsert} className="w-full">
                Insert Leads
            </Button>
        </div>
    );
}
