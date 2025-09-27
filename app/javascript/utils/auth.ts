import axios from 'axios';
import { LoginCredentials, UserRole } from '@/types/api';

export interface AuthResponse {
  data: {
    id: number;
    email: string;
    name: string;
    role: UserRole;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials, role: UserRole): Promise<AuthResponse> => {
    const response = await axios.post(`/api/v1/${role}s/sign_in`, {
      [`${role}`]: credentials
    }, {
      withCredentials: true // Important for handling cookies
    });

    const userData = response.data.data[role];
    if (!userData) {
      throw new Error('Invalid response from server');
    }

    return {
      data: userData,
    };
  },

  logout: async (role: UserRole): Promise<void> => {
    await axios.delete(`/api/v1/${role}s/sign_out`, {
      withCredentials: true // Important for handling cookies
    });
  }
};
