import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User, LoginCredentials, UserRole } from '@/types/api';
import { authApi } from '@/utils/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials, role: UserRole) => Promise<void>;
  logout: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get the current user session
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/v1/me', { withCredentials: true });
        if (response.data?.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.error('Failed to restore user session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (credentials: LoginCredentials, role: UserRole) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await authApi.login(credentials, role);
      if (!response.data) {
        throw new Error('Invalid response from server');
      }

      const user: User = response.data;

      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log in');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (role: UserRole) => {
    try {
      setError(null);
      setIsLoading(true);
      await authApi.logout(role);
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log out');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
