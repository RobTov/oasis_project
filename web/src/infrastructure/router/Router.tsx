import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../presentation/contexts/AuthContext';
import { PublicLayout } from '../../presentation/components/layout/PublicLayout';
import { DashboardLayout } from '../../presentation/components/layout/DashboardLayout';
import { AdminLayout } from '../../presentation/components/layout/AdminLayout';
import { LoginPage } from '../../presentation/pages/auth/LoginPage';
import { RegisterPage } from '../../presentation/pages/auth/RegisterPage';
import { HomePage } from '../../presentation/pages/public/HomePage';
import { DashboardPage } from '../../presentation/pages/dashboard/DashboardPage';
import { AdminServicesPage } from '../../presentation/pages/admin/AdminServicesPage';
import { AdminProjectsPage } from '../../presentation/pages/admin/AdminProjectsPage';
import { AdminBlogsPage } from '../../presentation/pages/admin/AdminBlogsPage';
import { LoadingSpinner } from '../../presentation/components/common/LoadingSpinner';

function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" replace />;
  
  return <>{children}</>;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
