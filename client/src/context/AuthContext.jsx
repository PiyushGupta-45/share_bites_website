import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('sharebite_token');

  useEffect(() => {
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/me');
        setUser(data?.data?.user || null);
      } catch {
        localStorage.removeItem('sharebite_token');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token]);

  const signIn = async (email, password) => {
    const { data } = await api.post('/auth/signin', { email, password });
    localStorage.setItem('sharebite_token', data.data.token);
    setUser(data.data.user);
  };

  const signUp = async (name, email, password) => {
    const { data } = await api.post('/auth/signup', { name, email, password });
    localStorage.setItem('sharebite_token', data.data.token);
    setUser(data.data.user);
  };

  const signOut = () => {
    localStorage.removeItem('sharebite_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      signIn,
      signUp,
      signOut,
      setUser,
    }),
    [loading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
