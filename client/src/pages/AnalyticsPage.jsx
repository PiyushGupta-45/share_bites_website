import { Card } from '../components/UI';

const insights = [
  { metric: 'Waste Diverted', value: '612 kg', trend: '+12%', description: 'Upcycling surplus brunch buffets (week-on-week).' },
  { metric: 'Peak Waste Window', value: '21 hrs', trend: '-5%', description: 'Late-night prep sees lower discard rates.' },
  { metric: 'CO2 Offset', value: '1.9 t', trend: '+8%', description: 'Linked to optimized route batching.' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold text-primary">Waste Intelligence Panel</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {insights.map((item) => (
            <div key={item.metric} className="rounded-xl border p-3">
              <p className="text-xs text-slate-500">{item.metric}</p>
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-xs text-slate-500">{item.trend}</p>
              <p className="mt-1 text-xs text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold">Optimization Recommendations</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Batch pickups around evening hotspots to reduce spoilage.</li>
          <li>Prioritize cold-chain vehicles for perishable alerts.</li>
          <li>Nudge restaurant partners with near-expiry reminders.</li>
        </ul>
      </Card>
    </div>
  );
}
