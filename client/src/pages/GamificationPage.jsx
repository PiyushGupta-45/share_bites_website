import { Card } from '../components/UI';
import { gamificationStats } from '../data/mockData';

export default function GamificationPage() {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold text-primary">Gamification</h2>
        <p className="text-sm text-slate-500">Badges, streaks, and leaderboards for volunteer motivation.</p>
      </Card>

      <Card>
        <h3 className="font-semibold">Badges Earned</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {gamificationStats.badges.map((badge) => (
            <span key={badge} className="rounded-full border px-3 py-1 text-sm">{badge}</span>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold">Leaderboard</h3>
        <div className="mt-2 space-y-2">
          {gamificationStats.leaderboard.map((entry) => (
            <div key={entry.rank} className="rounded-xl border p-3 text-sm">
              #{entry.rank} {entry.user} · {entry.mealsServed} meals impact
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
