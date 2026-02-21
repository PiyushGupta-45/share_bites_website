import { useState } from 'react';
import { Card, Button } from '../components/UI';
import { volunteerRequests } from '../data/mockData';

export default function VolunteerNetworkPage() {
  const [accepted, setAccepted] = useState([]);

  const toggleAccept = (id) => {
    setAccepted((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));
  };

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold text-primary">Share Bites Riders</h2>
        <p className="text-sm text-slate-500">Active runs: {accepted.length}</p>
      </Card>

      {volunteerRequests.map((req) => (
        <Card key={req.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{req.id}</h3>
            <span className={`rounded-full px-2 py-1 text-xs ${req.highPriority ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>
              {req.highPriority ? 'Urgent' : 'Flex'}
            </span>
          </div>
          <p className="text-sm text-slate-600">Pickup: {req.pickupPoint}</p>
          <p className="text-sm text-slate-600">Drop-off: {req.dropOffPoint}</p>
          <p className="text-xs text-slate-500">{req.payloadType} · {req.distanceKm} km · Ready by {req.readyBy}</p>
          <Button onClick={() => toggleAccept(req.id)}>
            {accepted.includes(req.id) ? 'Release slot' : 'Accept ride'}
          </Button>
        </Card>
      ))}
    </div>
  );
}
