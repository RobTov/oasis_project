import api from '../api/client';
import type { Team, TeamCreate } from '../../domain/entities';

export const teamRepository = {
  async getAll(): Promise<Team[]> {
    const response = await api.get<Team[]>('/team/');
    return response.data;
  },

  async getById(id: number): Promise<Team> {
    const response = await api.get<Team>(`/team/${id}/`);
    return response.data;
  },

  async create(data: TeamCreate): Promise<Team> {
    const response = await api.post<Team>('/team/', data);
    return response.data;
  },

  async update(id: number, data: Partial<TeamCreate>): Promise<Team> {
    const response = await api.patch<Team>(`/team/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/team/${id}/`);
  },
};
