import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Layout from '@/components/navigation/Layout';
import Login from '@/components/auth/Login';
import BooksSearch from './books/BooksSearch';
import MemberDashboard from './dashboard/MemberDashboard';
import LibrarianDashboard from './dashboard/LibrarianDashboard';

const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Unauthorized</h1>
      <p className="text-gray-600">You don't have permission to access this page.</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected Member Routes */}
          <Route
            path="/member/*"
            element={
              <ProtectedRoute requiredRole="member">
                <Routes>
                  <Route path="dashboard" element={<MemberDashboard />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Protected Librarian Routes */}
          <Route
            path="/librarian/*"
            element={
              <ProtectedRoute requiredRole="librarian">
                <Routes>
                  <Route path="dashboard" element={<LibrarianDashboard />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
