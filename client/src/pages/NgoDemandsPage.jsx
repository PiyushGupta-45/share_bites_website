import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Button, Card, Input } from '../components/UI';
import { useAuth } from '../context/AuthContext';

const initialForm = { ngoId: '', amount: '', unit: 'meals', requiredBy: '', description: '' };

export default function NgoDemandsPage() {
  const { user } = useAuth();
  const [ngos, setNgos] = useState([]);
  const [demands, setDemands] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState('');
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');

  const loadNgos = () => {
    api.get('/ngos').then((res) => {
      const list = res.data?.data?.ngos || [];
      setNgos(list);
      if (list.length && !selectedNgo) {
        setSelectedNgo(list[0].id);
        setForm((s) => ({ ...s, ngoId: list[0].id }));
      }
    });
  };

  const loadDemands = (ngoId) => {
    if (!ngoId) return;
    api.get(`/ngo-demands/ngo/${ngoId}`).then((res) => setDemands(res.data?.data?.demands || [])).catch(() => setDemands([]));
  };

  useEffect(() => {
    loadNgos();
  }, []);

  useEffect(() => {
    if (selectedNgo) {
      loadDemands(selectedNgo);
      setForm((s) => ({ ...s, ngoId: selectedNgo }));
    }
  }, [selectedNgo]);

  const createDemand = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ngo-demands', form);
      setMessage('Demand created successfully.');
      setForm((s) => ({ ...initialForm, ngoId: s.ngoId }));
      loadDemands(selectedNgo);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to create demand.');
    }
  };

  const removeDemand = async (id) => {
    try {
      await api.delete(`/ngo-demands/${id}`);
      setMessage('Demand deleted.');
      loadDemands(selectedNgo);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to delete demand.');
    }
  };

  if (user?.role !== 'ngo_admin') {
    return <Card>Create Demand is available for NGO Admin role only.</Card>;
  }

  return (
    <div className="space-y-4">
      {message ? <Card className="text-sm text-primary">{message}</Card> : null}

      <Card className="space-y-3">
        <h2 className="text-xl font-bold text-primary">Create NGO Demand</h2>
        <label className="text-sm font-medium">Select NGO</label>
        <select
          className="w-full rounded-xl border border-slate-300 px-3 py-2"
          value={selectedNgo}
          onChange={(e) => setSelectedNgo(e.target.value)}
        >
          {ngos.map((ngo) => (
            <option key={ngo.id} value={ngo.id}>{ngo.name}</option>
          ))}
        </select>

        <form className="grid gap-2 md:grid-cols-2" onSubmit={createDemand}>
          <Input
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))}
            required
          />
          <Input
            placeholder="Unit (meals/kg/trays)"
            value={form.unit}
            onChange={(e) => setForm((s) => ({ ...s, unit: e.target.value }))}
            required
          />
          <Input
            type="datetime-local"
            value={form.requiredBy}
            onChange={(e) => setForm((s) => ({ ...s, requiredBy: e.target.value }))}
            required
          />
          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          />
          <Button className="md:col-span-2" type="submit">Create Demand</Button>
        </form>
      </Card>

      <div className="space-y-2">
        {demands.map((demand) => (
          <Card key={demand.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{demand.amount} {demand.unit}</h3>
              <span className="text-xs text-slate-500">{demand.status.toUpperCase()}</span>
            </div>
            <p className="text-sm text-slate-600">Required by {dayjs(demand.requiredBy).format('DD MMM YYYY hh:mm A')}</p>
            <p className="text-sm text-slate-600">{demand.description || 'No description'}</p>
            <Button className="bg-red-600" onClick={() => removeDemand(demand.id)} disabled={demand.status === 'accepted'}>
              Delete
            </Button>
          </Card>
        ))}
        {demands.length === 0 ? <Card>No demands created yet.</Card> : null}
      </div>
    </div>
  );
}
