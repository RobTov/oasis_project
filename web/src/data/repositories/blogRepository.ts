import api from '../api/client';
import type { BlogPost, BlogPostCreate } from '../../domain/entities';

export const blogRepository = {
  async getAll(): Promise<BlogPost[]> {
    const response = await api.get<BlogPost[]>('/blog-posts/');
    return response.data;
  },

  async getById(id: number): Promise<BlogPost> {
    const response = await api.get<BlogPost>(`/blog-posts/${id}/`);
    return response.data;
  },

  async create(data: BlogPostCreate): Promise<BlogPost> {
    const response = await api.post<BlogPost>('/blog-posts/', data);
    return response.data;
  },

  async update(id: number, data: Partial<BlogPostCreate>): Promise<BlogPost> {
    const response = await api.patch<BlogPost>(`/blog-posts/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/blog-posts/${id}/`);
  },
};
