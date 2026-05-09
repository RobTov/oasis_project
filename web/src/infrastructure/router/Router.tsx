import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../presentation/contexts/AuthContext';
import { PublicLayout } from '../../presentation/components/layout/PublicLayout';
import { DashboardLayout } from '../../presentation/components/layout/DashboardLayout';
import { AdminLayout } from '../../presentation/components/layout/AdminLayout';
import { LoginPage } from '../../presentation/pages/auth/LoginPage';
import { RegisterPage } from '../../presentation/pages/auth/RegisterPage';
import { HomePage } from '../../presentation/pages/public/HomePage';
import { ServicesPage } from '../../presentation/pages/public/ServicesPage';
import { ProjectsPage } from '../../presentation/pages/public/ProjectsPage';
import { CampaignsPage } from '../../presentation/pages/public/CampaignsPage';
import { BlogPage } from '../../presentation/pages/public/BlogPage';
import { TeamPage } from '../../presentation/pages/public/TeamPage';
import { TestimonialsPage } from '../../presentation/pages/public/TestimonialsPage';
import { ContactPage } from '../../presentation/pages/public/ContactPage';
import { DashboardPage } from '../../presentation/pages/dashboard/DashboardPage';
import { AdminResumenPage } from '../../presentation/pages/admin/AdminResumenPage';
import { AdminServicesPage } from '../../presentation/pages/admin/AdminServicesPage';
import { AdminProjectsPage } from '../../presentation/pages/admin/AdminProjectsPage';
import { AdminBlogsPage } from '../../presentation/pages/admin/AdminBlogsPage';
import { AdminClientsPage } from '../../presentation/pages/admin/AdminClientsPage';
import { AdminTeamPage } from '../../presentation/pages/admin/AdminTeamPage';
import { AdminCampaignsPage } from '../../presentation/pages/admin/AdminCampaignsPage';
import { AdminSubscribersPage } from '../../presentation/pages/admin/AdminSubscribersPage';
import { AdminTestimonialsPage } from '../../presentation/pages/admin/AdminTestimonialsPage';
import { AdminContactsPage } from '../../presentation/pages/admin/AdminContactsPage';
import { AdminUsersPage } from '../../presentation/pages/admin/AdminUsersPage';
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
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/campanas" element={<CampaignsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/equipo" element={<TeamPage />} />
          <Route path="/testimonios" element={<TestimonialsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
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
          <Route index element={<AdminResumenPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
          <Route path="clients" element={<AdminClientsPage />} />
          <Route path="team" element={<AdminTeamPage />} />
          <Route path="campaigns" element={<AdminCampaignsPage />} />
          <Route path="subscribers" element={<AdminSubscribersPage />} />
          <Route path="testimonials" element={<AdminTestimonialsPage />} />
          <Route path="contacts" element={<AdminContactsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
