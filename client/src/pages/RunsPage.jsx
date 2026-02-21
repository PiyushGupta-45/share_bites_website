import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Button, Card, Input } from '../components/UI';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  restaurantId: '',
  ngoId: '',
  pickupTime: '',
  deliveryTime: '',
  numberOfMeals: '',
  description: '',
  urgencyTag: 'Flex',
};

export default function RunsPage() {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [acceptedDemands, setAcceptedDemands] = useState([]);
  const [myRuns, setMyRuns] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/restaurants').then((res) => {
      const list = res.data?.data?.restaurants || [];
      setRestaurants(list);
      if (list[0]) setForm((s) => ({ ...s, restaurantId: list[0].id }));
    });
    api.get('/ngos').then((res) => {
      const list = res.data?.data?.ngos || [];
      setNgos(list);
      if (list[0]) setForm((s) => ({ ...s, ngoId: list[0].id }));
    });
    api.get('/ngo-demands/accepted-for-volunteers').then((res) => setAcceptedDemands(res.data?.data?.demands || []));
    api.get('/delivery-runs').then((res) => setMyRuns(res.data?.data?.deliveryRuns || [])).catch(() => setMyRuns([]));
  }, []);

  const acceptRun = async (e) => {
    e.preventDefault();
    try {
      await api.post('/delivery-runs/accept', form);
      setMessage('Delivery run accepted.');
      const { data } = await api.get('/delivery-runs');
      setMyRuns(data?.data?.deliveryRuns || []);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to accept run.');
    }
  };

  return (
    <div className="space-y-4">
      {message ? <Card className="text-sm text-primary">{message}</Card> : null}

      <Card>
        <h2 className="text-xl font-bold text-primary">Restaurant Partners</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {restaurants.map((r) => (
            <div key={r.id} className="rounded-xl border p-3">
              <p className="font-semibold">{r.name}</p>
              <p className="text-xs text-slate-500">{r.location}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-primary">Restaurant Accepted Deliveries</h3>
        <div className="mt-2 space-y-2">
          {acceptedDemands.map((d) => (
            <div key={d.id} className="rounded-xl border p-3">
              <p className="font-semibold">{d.restaurantName || 'Restaurant'} to {d.ngoName}</p>
              <p className="text-xs text-slate-500">{d.amount} {d.unit} | {d.description || 'No description'}</p>
            </div>
          ))}
          {acceptedDemands.length === 0 ? <p className="text-sm text-slate-500">No accepted demands yet.</p> : null}
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="font-semibold text-primary">Accept Delivery Run</h3>
        <form className="grid gap-2 md:grid-cols-2" onSubmit={acceptRun}>
          <select
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
            value={form.restaurantId}
            onChange={(e) => setForm((s) => ({ ...s, restaurantId: e.target.value }))}
          >
            {restaurants.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <select
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
            value={form.ngoId}
            onChange={(e) => setForm((s) => ({ ...s, ngoId: e.target.value }))}
          >
            {ngos.map((n) => <option key={n.id} value={n.id}>{n.name}</option>)}
          </select>
          <Input type="datetime-local" value={form.pickupTime} onChange={(e) => setForm((s) => ({ ...s, pickupTime: e.target.value }))} required />
          <Input type="datetime-local" value={form.deliveryTime} onChange={(e) => setForm((s) => ({ ...s, deliveryTime: e.target.value }))} required />
          <Input type="number" placeholder="Meals" value={form.numberOfMeals} onChange={(e) => setForm((s) => ({ ...s, numberOfMeals: e.target.value }))} required />
          <Input placeholder="Description" value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
          <Button className="md:col-span-2" type="submit">Accept Run</Button>
        </form>
      </Card>

      <Card>
        <h3 className="font-semibold text-primary">My Delivery Runs ({user?.name})</h3>
        <div className="mt-2 space-y-2">
          {myRuns.map((run) => (
            <div key={run.id} className="rounded-xl border p-3 text-sm">
              <p className="font-semibold">{run.restaurant?.name} to {run.ngo?.name}</p>
              <p className="text-slate-500">{run.numberOfMeals} meals | Status: {run.status}</p>
            </div>
          ))}
          {myRuns.length === 0 ? <p className="text-sm text-slate-500">No delivery runs yet.</p> : null}
        </div>
      </Card>
    </div>
  );
}
