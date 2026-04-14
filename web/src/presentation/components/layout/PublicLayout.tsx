import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

export function PublicLayout() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Oasis
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
                  {user.role === 'administrator' && (
                    <Link to="/admin/services" className="text-gray-600 hover:text-gray-900 transition-colors">Admin</Link>
                  )}
                  <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                    <span className="text-sm text-gray-600">Hi, {user.name || user.username}</span>
                    <button onClick={logout} className="text-gray-600 hover:text-red-500 transition-colors">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
                  <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4">
            <Link to="/" className="block text-gray-600">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block text-gray-600">Dashboard</Link>
                {user.role === 'administrator' && (
                  <Link to="/admin/services" className="block text-gray-600">Admin</Link>
                )}
                <button onClick={logout} className="block text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-600">Login</Link>
                <Link to="/register" className="block text-blue-600">Get Started</Link>
              </>
            )}
          </div>
        )}
      </nav>

      <Outlet />
    </div>
  );
}
