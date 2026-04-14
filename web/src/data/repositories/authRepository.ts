import api from '../api/client';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../../domain/entities';

export const authRepository = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/token/', data);
    const { access, refresh } = response.data;
    
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    
    const userResponse = await api.get<User>('/auth/users/me/', {
      headers: { Authorization: `Bearer ${access}` },
    });
    
    return { access, refresh, user: userResponse.data };
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    await api.post<AuthResponse>('/auth/users/', data);
    return authRepository.login({ username: data.username, password: data.password });
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>('/auth/users/me/');
    return data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};
