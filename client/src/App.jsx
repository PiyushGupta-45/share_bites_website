import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import AppLayout from './components/AppLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import NgoNeedsPage from './pages/NgoNeedsPage';
import NgoDemandsPage from './pages/NgoDemandsPage';
import RunsPage from './pages/RunsPage';
import RoleRunsPage from './pages/RoleRunsPage';
import ImpactPage from './pages/ImpactPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import TrustSafetyPage from './pages/TrustSafetyPage';
import LogisticsPage from './pages/LogisticsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import GamificationPage from './pages/GamificationPage';
import VolunteerNetworkPage from './pages/VolunteerNetworkPage';

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="runs" element={<RoleRunsPage />} />
        <Route
          path="ngo-needs"
          element={
            <RoleRoute allow={['restaurant']}>
              <NgoNeedsPage />
            </RoleRoute>
          }
        />
        <Route
          path="ngo-demands"
          element={
            <RoleRoute allow={['ngo_admin']}>
              <NgoDemandsPage />
            </RoleRoute>
          }
        />
        <Route
          path="trust-safety"
          element={
            <RoleRoute allow={['user', 'admin']}>
              <TrustSafetyPage />
            </RoleRoute>
          }
        />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="logistics" element={<LogisticsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="gamification" element={<GamificationPage />} />
        <Route path="volunteer-network" element={<VolunteerNetworkPage />} />
        <Route path="runs-general" element={<RunsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
