import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';
import { Card } from '../components/UI';

export default function HomePage() {
  const [ngos, setNgos] = useState([]);
  const [location, setLocation] = useState('all');

  useEffect(() => {
    api.get('/ngos').then((res) => setNgos(res.data?.data?.ngos || [])).catch(() => setNgos([]));
  }, []);

  const locations = useMemo(() => ['all', ...new Set(ngos.map((n) => n.location))], [ngos]);
  const filtered = location === 'all' ? ngos : ngos.filter((n) => n.location === location);

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-2xl font-bold text-primary">NGOs Associated with Us</h2>
        <p className="text-sm text-slate-500">Discover organizations making a difference in your community.</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {locations.map((loc) => (
            <button
              key={loc}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                location === loc ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
              }`}
              onClick={() => setLocation(loc)}
            >
              {loc}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((ngo) => (
          <Card key={ngo.id} className="space-y-2">
            <img
              src={ngo.mainImage || 'https://via.placeholder.com/320x180?text=NGO'}
              alt={ngo.name}
              className="h-40 w-full rounded-xl object-cover"
            />
            <h3 className="text-lg font-semibold text-primary">{ngo.name}</h3>
            <p className="text-sm text-slate-500">{ngo.tagline}</p>
            <p className="text-xs text-slate-500">{ngo.location}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
