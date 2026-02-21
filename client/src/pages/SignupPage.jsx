import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input } from '../components/UI';

export default function SignupPage() {
  const { signUp } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUp(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-primary">Create Account</h2>
        <p className="text-sm text-slate-500">Join the Share Bites network.</p>

        <form className="space-y-3" onSubmit={onSubmit}>
          <Input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            required
          />
          <Input
            type="password"
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            required
            minLength={6}
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-sm">
          Already have an account?{' '}
          <Link className="font-semibold text-primary underline" to="/login">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
