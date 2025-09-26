import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (user) {
      await logout(user.role);
    }
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                Bookworm
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500">
              {user.role === 'librarian' ? 'Librarian' : 'Member'}: {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
