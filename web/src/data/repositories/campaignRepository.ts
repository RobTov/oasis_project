import api from '../api/client';
import type { Campaign, CampaignCreate } from '../../domain/entities';

export const campaignRepository = {
  async getAll(): Promise<Campaign[]> {
    const response = await api.get<Campaign[]>('/campaigns/');
    return response.data;
  },

  async getById(id: number): Promise<Campaign> {
    const response = await api.get<Campaign>(`/campaigns/${id}/`);
    return response.data;
  },

  async create(data: CampaignCreate): Promise<Campaign> {
    const response = await api.post<Campaign>('/campaigns/', data);
    return response.data;
  },

  async update(id: number, data: Partial<CampaignCreate>): Promise<Campaign> {
    const response = await api.patch<Campaign>(`/campaigns/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/campaigns/${id}/`);
  },
};
