import axios from 'axios';
import { LoginCredentials, UserRole } from '@/types/api';

export interface AuthResponse {
  data: {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    token: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials, role: UserRole): Promise<AuthResponse> => {
    const response = await axios.post(`/api/v1/${role}s/sign_in`, {
      [`${role}`]: credentials
    });

    // Extract bearer token from Authorization header
    const token = response.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('No token received from server');
    }

    // Store the token in localStorage
    localStorage.setItem('bookworm_token', token);

    // Store the user data
    const userData = response.data.data[role];
    if (userData) {
      localStorage.setItem('bookworm_user', JSON.stringify({
        ...userData,
        role,
        token
      }));
    }

    return {
      data: userData,
    };
  },

  logout: async (role: UserRole): Promise<void> => {
    const token = localStorage.getItem('bookworm_token');

    if (token) {
      try {
        await axios.delete(`/api/v1/${role}s/sign_out`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } finally {
        // Clear stored auth data regardless of logout API success
        localStorage.removeItem('bookworm_token');
        localStorage.removeItem('bookworm_user');
      }
    }
  }
};

// Helper functions to manage auth state
export const getStoredToken = (): string | null => {
  return localStorage.getItem('bookworm_token');
};

export const getStoredUser = () => {
  const userJson = localStorage.getItem('bookworm_user');
  return userJson ? JSON.parse(userJson) : null;
};

export const clearAuthData = () => {
  localStorage.removeItem('bookworm_token');
  localStorage.removeItem('bookworm_user');
};
