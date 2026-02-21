import { Card } from '../components/UI';
import { logisticsAlerts } from '../data/mockData';

export default function LogisticsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold text-primary">Geo-fenced Logistics Alerts</h2>
        <p className="text-sm text-slate-500">Live radius monitor, urgency, and cold-chain readiness.</p>
      </Card>

      {logisticsAlerts.map((alert) => (
        <Card key={alert.donorName} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{alert.donorName}</h3>
            <span className="rounded-full bg-orange-100 px-2 py-1 text-xs">{alert.urgencyTag}</span>
          </div>
          <p className="text-sm text-slate-600">{alert.location}</p>
          <p className="text-xs text-slate-500">Radius: {alert.radiusKm} km · Expires in {alert.expiryIn}</p>
          {alert.requiresRefrigeration ? <p className="text-xs font-semibold text-red-600">Cold Chain Required</p> : null}
        </Card>
      ))}
    </div>
  );
}
