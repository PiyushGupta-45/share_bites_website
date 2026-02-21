import { Card } from '../components/UI';
import { forumPosts, hungerSquadAlerts, resourceBarters } from '../data/mockData';

export default function CommunityPage() {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold text-primary">Zero Waste Forums</h2>
        <div className="mt-3 space-y-2">
          {forumPosts.map((post, idx) => (
            <div key={`${post.author}-${idx}`} className="rounded-xl border p-3">
              <p className="font-semibold">{post.author} · {post.topic}</p>
              <p className="text-sm text-slate-600">{post.message}</p>
              <p className="text-xs text-slate-500">{post.time} · {post.upvotes} upvotes</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold">SOS Calls</h3>
        <div className="mt-2 space-y-2">
          {hungerSquadAlerts.map((alert) => (
            <div key={alert.groupName} className="rounded-xl border p-3">
              <p className="font-semibold">{alert.groupName} ({alert.location})</p>
              <p className="text-sm text-slate-600">{alert.need}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold">Resource Barter</h3>
        <div className="mt-2 space-y-2">
          {resourceBarters.map((item) => (
            <div key={item.requester} className="rounded-xl border p-3 text-sm">
              <p className="font-semibold">{item.requester}</p>
              <p>Offers: {item.offer}</p>
              <p>Needs: {item.request}</p>
              <p className="text-xs text-slate-500">{item.status}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
