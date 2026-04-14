import api from '../api/client';
import type { Project, ProjectCreate } from '../../domain/entities';

export const projectRepository = {
  async getAll(): Promise<Project[]> {
    const response = await api.get<Project[]>('/projects/');
    return response.data;
  },

  async getById(id: number): Promise<Project> {
    const response = await api.get<Project>(`/projects/${id}/`);
    return response.data;
  },

  async create(data: ProjectCreate): Promise<Project> {
    const response = await api.post<Project>('/projects/', data);
    return response.data;
  },

  async update(id: number, data: Partial<ProjectCreate>): Promise<Project> {
    const response = await api.patch<Project>(`/projects/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/projects/${id}/`);
  },
};
