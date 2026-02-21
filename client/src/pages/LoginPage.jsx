import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input } from '../components/UI';

export default function LoginPage() {
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-primary">Share Bites Login</h2>
        <p className="text-sm text-slate-500">Sign in with your email/password account.</p>

        <form className="space-y-3" onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            required
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button disabled={loading} className="w-full">
            {loading ? 'Signing in...' : 'Login'}
          </Button>
        </form>

        <p className="text-sm">
          New user?{' '}
          <Link className="font-semibold text-primary underline" to="/signup">
            Create account
          </Link>
        </p>
      </Card>
    </div>
  );
}
