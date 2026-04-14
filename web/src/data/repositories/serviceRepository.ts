import api from '../api/client';
import type { Service, ServiceCreate } from '../../domain/entities';

export const serviceRepository = {
  async getAll(): Promise<Service[]> {
    const response = await api.get<Service[]>('/services/');
    return response.data;
  },

  async getById(id: number): Promise<Service> {
    const response = await api.get<Service>(`/services/${id}/`);
    return response.data;
  },

  async create(data: ServiceCreate): Promise<Service> {
    const response = await api.post<Service>('/services/', data);
    return response.data;
  },

  async update(id: number, data: Partial<ServiceCreate>): Promise<Service> {
    const response = await api.patch<Service>(`/services/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/services/${id}/`);
  },
};
