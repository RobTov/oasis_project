import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PublicLayout() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  const navLinks = [
    { label: 'Inicio', action: () => { setMobileMenuOpen(false); }, to: '/' },
    { label: 'Servicios', action: () => scrollToSection('servicios'), to: '/servicios' },
    { label: 'Proyectos', action: () => scrollToSection('proyectos'), to: '/proyectos' },
    { label: 'Campañas', action: () => scrollToSection('campanas'), to: '/campanas' },
    { label: 'Blog', action: () => scrollToSection('blog'), to: '/blog' },
    { label: 'Equipo', action: () => scrollToSection('equipo'), to: '/equipo' },
    { label: 'Testimonios', action: () => scrollToSection('testimonios'), to: '/testimonios' },
    { label: 'Contacto', action: () => scrollToSection('contacto'), to: '/contacto' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Oasis
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                  <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Panel</Link>
                  {user.role === 'administrator' && (
                    <Link to="/admin/services" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Admin</Link>
                  )}
                  <span className="text-sm text-gray-500">Hola, {user.name || user.username}</span>
                  <button onClick={logout} className="text-gray-600 hover:text-red-500 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Iniciar Sesión</Link>
                  <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Comenzar
                  </Link>
                </div>
              )}
            </div>

            <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-3">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600">Panel</Link>
                  {user.role === 'administrator' && (
                    <Link to="/admin/services" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600">Administración</Link>
                  )}
                  <div className="px-0 py-2 text-sm text-gray-500">Hola, {user.name || user.username}</div>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block text-red-500">Cerrar Sesión</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600">Iniciar Sesión</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block text-blue-600 font-medium">Comenzar</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg" />
                <span className="text-2xl font-bold">Oasis</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Oasis Promotions Agency es una agencia creativa de servicios completos dedicada a ayudar
                a las marcas a crecer mediante estrategias de marketing innovadoras y narrativas convincentes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li><Link to="/servicios" className="hover:text-white transition-colors">Servicios</Link></li>
                <li><Link to="/proyectos" className="hover:text-white transition-colors">Proyectos</Link></li>
                <li><Link to="/campanas" className="hover:text-white transition-colors">Campañas</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/equipo" className="hover:text-white transition-colors">Equipo</Link></li>
                <li><Link to="/testimonios" className="hover:text-white transition-colors">Testimonios</Link></li>
                <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Comenzar</h4>
              {user ? (
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/dashboard" className="hover:text-white transition-colors">Panel</Link></li>
                  {user.role === 'administrator' && (
                    <li><Link to="/admin/services" className="hover:text-white transition-colors">Administración</Link></li>
                  )}
                </ul>
              ) : (
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/login" className="hover:text-white transition-colors">Iniciar Sesión</Link></li>
                  <li><Link to="/register" className="hover:text-white transition-colors">Crear Cuenta</Link></li>
                </ul>
              )}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2026 Oasis Promotions Agency. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
