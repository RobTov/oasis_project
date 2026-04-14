import api from '../api/client';
import type { Client, Team, Campaign, Subscriber } from '../../domain/entities';

export const dashboardRepository = {
  async getClients(): Promise<Client[]> {
    const response = await api.get<Client[]>('/clients/');
    return response.data;
  },

  async getTeam(): Promise<Team[]> {
    const response = await api.get<Team[]>('/team/');
    return response.data;
  },

  async getCampaigns(): Promise<Campaign[]> {
    const response = await api.get<Campaign[]>('/campaigns/');
    return response.data;
  },

  async getSubscribers(): Promise<Subscriber[]> {
    const response = await api.get<Subscriber[]>('/subscribers/');
    return response.data;
  },
};
