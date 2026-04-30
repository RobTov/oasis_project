import api from '../api/client';
import type { Contact, ContactCreate } from '../../domain/entities';

export const contactRepository = {
  async getAll(): Promise<Contact[]> {
    const response = await api.get<Contact[]>('/contacts/');
    return response.data;
  },

  async getById(id: number): Promise<Contact> {
    const response = await api.get<Contact>(`/contacts/${id}/`);
    return response.data;
  },

  async create(data: ContactCreate): Promise<Contact> {
    const response = await api.post<Contact>('/contacts/', data);
    return response.data;
  },

  async update(id: number, data: Partial<ContactCreate>): Promise<Contact> {
    const response = await api.patch<Contact>(`/contacts/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/contacts/${id}/`);
  },
};
