import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, Button, Input, Textarea, Select, Modal } from '../../components/common';
import { testimonialRepository, clientRepository, projectRepository } from '../../../data/repositories';
import type { Testimonial, TestimonialCreate } from '../../../domain/entities';

const testimonialSchema = z.object({
  client: z.string().min(1, 'Client is required'),
  project: z.string().min(1, 'Project is required'),
  text: z.string().min(1, 'Testimonial text is required'),
  date: z.string().min(1, 'Date is required'),
});

type TestimonialForm = z.infer<typeof testimonialSchema>;

export function AdminTestimonialsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: testimonialRepository.getAll,
  });

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: clientRepository.getAll,
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: projectRepository.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: TestimonialCreate) => testimonialRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TestimonialCreate> }) =>
      testimonialRepository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => testimonialRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setDeleteId(null);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialForm>({
    resolver: zodResolver(testimonialSchema),
  });

  const openCreateModal = () => {
    setEditingTestimonial(null);
    reset({ client: '', project: '', text: '', date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const openEditModal = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    reset({
      client: testimonial.client.toString(),
      project: testimonial.project.toString(),
      text: testimonial.text,
      date: testimonial.date,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    reset({ client: '', project: '', text: '', date: '' });
  };

  const onSubmit = (data: TestimonialForm) => {
    const payload = {
      client: parseInt(data.client),
      project: parseInt(data.project),
      text: data.text,
      date: data.date,
    };
    
    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const clientOptions = clients?.map(c => ({ value: c.id.toString(), label: c.name })) || [];
  const projectOptions = projects?.map(p => ({ value: p.id.toString(), label: p.title })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage client testimonials</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Testimonial</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials?.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{testimonial.client_name}</td>
                    <td className="py-4 px-4 text-gray-700">{testimonial.project_title}</td>
                    <td className="py-4 px-4 text-gray-700 truncate max-w-md">{testimonial.text}</td>
                    <td className="py-4 px-4 text-gray-700">{new Date(testimonial.date).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(testimonial)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => setDeleteId(testimonial.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!testimonials || testimonials.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No testimonials yet. Add your first testimonial.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select label="Client" options={clientOptions} {...register('client')} error={errors.client?.message} />
          <Select label="Project" options={projectOptions} {...register('project')} error={errors.project?.message} />
          <Input label="Date" type="date" {...register('date')} error={errors.date?.message} />
          <Textarea label="Testimonial" placeholder="Client testimonial text..." rows={4} {...register('text')} error={errors.text?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingTestimonial ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Testimonial">
        <p className="text-gray-600 mb-6">Are you sure you want to delete this testimonial? This action cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteId && deleteMutation.mutate(deleteId)} isLoading={deleteMutation.isPending} className="flex-1">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
