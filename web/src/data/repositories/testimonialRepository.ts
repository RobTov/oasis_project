import api from '../api/client';
import type { Testimonial, TestimonialCreate } from '../../domain/entities';

export const testimonialRepository = {
  async getAll(): Promise<Testimonial[]> {
    const response = await api.get<Testimonial[]>('/testimonials/');
    return response.data;
  },

  async getById(id: number): Promise<Testimonial> {
    const response = await api.get<Testimonial>(`/testimonials/${id}/`);
    return response.data;
  },

  async create(data: TestimonialCreate): Promise<Testimonial> {
    const response = await api.post<Testimonial>('/testimonials/', data);
    return response.data;
  },

  async update(id: number, data: Partial<TestimonialCreate>): Promise<Testimonial> {
    const response = await api.patch<Testimonial>(`/testimonials/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/testimonials/${id}/`);
  },
};
