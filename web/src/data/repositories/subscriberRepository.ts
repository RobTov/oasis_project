import api from '../api/client';
import type { Subscriber, SubscriberCreate } from '../../domain/entities';

export const subscriberRepository = {
  async getAll(): Promise<Subscriber[]> {
    const response = await api.get<Subscriber[]>('/subscribers/');
    return response.data;
  },

  async getById(id: number): Promise<Subscriber> {
    const response = await api.get<Subscriber>(`/subscribers/${id}/`);
    return response.data;
  },

  async create(data: SubscriberCreate): Promise<Subscriber> {
    const response = await api.post<Subscriber>('/subscribers/', data);
    return response.data;
  },

  async update(id: number, data: Partial<SubscriberCreate>): Promise<Subscriber> {
    const response = await api.patch<Subscriber>(`/subscribers/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/subscribers/${id}/`);
  },
};
