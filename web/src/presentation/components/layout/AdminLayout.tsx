import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, LogOut, ChevronRight, Wrench, FolderKanban, FileText, ArrowLeft, Users, UserCheck, Megaphone, Mail, MessageSquare, UserCog, BarChart3 } from 'lucide-react';
import { clsx } from 'clsx';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/admin', label: 'Resumen', icon: BarChart3 },
    { to: '/admin/services', label: 'Servicios', icon: Wrench },
    { to: '/admin/projects', label: 'Proyectos', icon: FolderKanban },
    { to: '/admin/blogs', label: 'Publicaciones del Blog', icon: FileText },
    { to: '/admin/clients', label: 'Clientes', icon: Users },
    { to: '/admin/team', label: 'Equipo', icon: UserCheck },
    { to: '/admin/campaigns', label: 'Campañas', icon: Megaphone },
    { to: '/admin/subscribers', label: 'Suscriptores', icon: Mail },
    { to: '/admin/testimonials', label: 'Testimonios', icon: MessageSquare },
    { to: '/admin/contacts', label: 'Contactos', icon: Mail },
    { to: '/admin/users', label: 'Usuarios', icon: UserCog },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white z-30">
        <div className="p-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"></div>
            <div>
              <span className="text-xl font-bold">Oasis</span>
              <p className="text-xs text-slate-400">Panel de Administración</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Panel
          </Link>
          <div className="mb-4 px-4">
            <p className="text-sm font-medium">{user?.name || user?.username}</p>
            <p className="text-xs text-slate-400">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <LayoutDashboard className="w-4 h-4" />
              <span>Administración</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">{navItems.find(n => n.to === '/admin' ? window.location.pathname === '/admin' : window.location.pathname.startsWith(n.to))?.label}</span>
            </div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
