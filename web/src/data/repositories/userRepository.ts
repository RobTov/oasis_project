import api from '../api/client';
import type { User, UserCreate } from '../../domain/entities';

export const userRepository = {
  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>('/auth/users/');
    return response.data;
  },

  async getById(id: number): Promise<User> {
    const response = await api.get<User>(`/auth/users/${id}/`);
    return response.data;
  },

  async create(data: UserCreate): Promise<User> {
    const response = await api.post<User>('/auth/users/', data);
    return response.data;
  },

  async update(id: number, data: Partial<UserCreate>): Promise<User> {
    const response = await api.patch<User>(`/auth/users/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/auth/users/${id}/`);
  },
};
