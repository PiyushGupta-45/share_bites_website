import { Card } from '../components/UI';
import { gamificationStats } from '../data/mockData';

export default function ImpactPage() {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold text-primary">Impact Dashboard</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-xs text-slate-500">CO2 Saved</p>
            <p className="text-2xl font-bold text-green-700">{gamificationStats.co2SavedKg} kg</p>
          </div>
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-xs text-slate-500">Meals Served</p>
            <p className="text-2xl font-bold text-blue-700">{gamificationStats.mealsServed}</p>
          </div>
          <div className="rounded-xl bg-orange-50 p-4">
            <p className="text-xs text-slate-500">Active Streak</p>
            <p className="text-2xl font-bold text-orange-700">{gamificationStats.activeStreakDays} days</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold">Badges</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {gamificationStats.badges.map((badge) => (
            <span key={badge} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{badge}</span>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold">Leaderboard</h3>
        <div className="mt-2 space-y-2">
          {gamificationStats.leaderboard.map((entry) => (
            <div key={entry.rank} className="rounded-xl border p-3">
              #{entry.rank} {entry.user} - {entry.mealsServed} meals
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
