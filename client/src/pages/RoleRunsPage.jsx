import { useAuth } from '../context/AuthContext';
import NgoDemandsPage from './NgoDemandsPage';
import NgoNeedsPage from './NgoNeedsPage';
import RunsPage from './RunsPage';

export default function RoleRunsPage() {
  const { user } = useAuth();

  if (user?.role === 'restaurant') {
    return <NgoNeedsPage />;
  }

  if (user?.role === 'ngo_admin') {
    return <NgoDemandsPage />;
  }

  return <RunsPage />;
}
