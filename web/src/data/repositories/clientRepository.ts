import api from '../api/client';
import type { Client, ClientCreate } from '../../domain/entities';

export const clientRepository = {
  async getAll(): Promise<Client[]> {
    const response = await api.get<Client[]>('/clients/');
    return response.data;
  },

  async getById(id: number): Promise<Client> {
    const response = await api.get<Client>(`/clients/${id}/`);
    return response.data;
  },

  async create(data: ClientCreate): Promise<Client> {
    const response = await api.post<Client>('/clients/', data);
    return response.data;
  },

  async update(id: number, data: Partial<ClientCreate>): Promise<Client> {
    const response = await api.patch<Client>(`/clients/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/clients/${id}/`);
  },
};
