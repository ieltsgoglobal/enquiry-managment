"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lead, LeadStatus } from '@/types/db/lead';

export default function AddLeadPage() {
  const [orgName, setOrgName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [status, setStatus] = useState(LeadStatus.New);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAddLead = async () => {
    const newLead: Lead = {
      id: crypto.randomUUID(),
      orgName,
      phoneNumbers: phoneNumbers.split(',').map((num) => num.trim()),
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/db/leads/insert/single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Failed to add lead');
      }
    } catch (err) {
      setError('An error occurred while adding the lead');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Lead</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="orgName" className="block text-sm font-medium">
          Organization Name
        </label>
        <Input
          type="text"
          id="orgName"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Enter organization name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumbers" className="block text-sm font-medium">
          Phone Numbers (comma-separated)
        </label>
        <Input
          type="text"
          id="phoneNumbers"
          value={phoneNumbers}
          onChange={(e) => setPhoneNumbers(e.target.value)}
          placeholder="Enter phone numbers"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          className="w-full px-3 py-2 border rounded"
        >
          {Object.values(LeadStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleAddLead} className="w-full">
        Add Lead
      </Button>
    </div>
  );
}
