import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Button, Card } from '../components/UI';
import { useAuth } from '../context/AuthContext';

export default function NgoNeedsPage() {
  const { user } = useAuth();
  const [demands, setDemands] = useState([]);
  const [message, setMessage] = useState('');

  const load = () => {
    api.get('/ngo-demands').then((res) => setDemands(res.data?.data?.demands || [])).catch(() => setDemands([]));
  };

  useEffect(() => {
    load();
  }, []);

  const accept = async (id) => {
    try {
      await api.post(`/ngo-demands/${id}/accept`);
      setMessage('Demand accepted successfully.');
      load();
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Unable to accept demand.');
    }
  };

  const ignore = async (id) => {
    try {
      await api.post(`/ngo-demands/${id}/ignore`);
      setMessage('Demand ignored.');
      load();
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Unable to ignore demand.');
    }
  };

  if (user?.role !== 'restaurant') {
    return <Card>NGO Needs is available for restaurant role only.</Card>;
  }

  return (
    <div className="space-y-3">
      {message ? <Card className="text-sm text-primary">{message}</Card> : null}
      {demands.map((demand) => (
        <Card key={demand.id} className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">{demand.ngoName}</h3>
            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
              Due {dayjs(demand.requiredBy).format('DD MMM YYYY hh:mm A')}
            </span>
          </div>
          <p className="text-sm font-semibold">{demand.amount} {demand.unit}</p>
          <p className="text-sm text-slate-600">{demand.description || 'No description'}</p>
          <div className="flex gap-2">
            <Button className="bg-slate-700" onClick={() => ignore(demand.id)}>Ignore</Button>
            <Button onClick={() => accept(demand.id)}>Accept</Button>
          </div>
        </Card>
      ))}
      {demands.length === 0 ? <Card>No NGO needs available right now.</Card> : null}
    </div>
  );
}
