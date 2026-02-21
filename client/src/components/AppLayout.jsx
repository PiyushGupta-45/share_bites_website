import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPrimaryNav } from '../lib/roleConfig';

export default function AppLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const links = getPrimaryNav(user?.role);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-primary">Share Bites Web</h1>
            <p className="text-xs text-slate-500">Rescue Food, Share Hope</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-xl bg-slate-100 px-3 py-2">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-xs text-slate-500">Role: {user?.role || 'user'}</p>
            </div>
            <button
              className="rounded-lg border px-3 py-2 text-xs font-semibold"
              onClick={() => {
                signOut();
                navigate('/login');
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-4 px-4 py-4 md:grid-cols-[260px,1fr]">
        <aside className="rounded-2xl bg-white p-3 shadow-soft">
          <nav className="grid gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="min-h-[70vh]">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
