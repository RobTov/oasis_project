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
  client: z.string().min(1, 'El cliente es obligatorio'),
  project: z.string().min(1, 'El proyecto es obligatorio'),
  text: z.string().min(1, 'El texto del testimonio es obligatorio'),
  date: z.string().min(1, 'La fecha es obligatoria'),
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
          <h1 className="text-2xl font-bold text-gray-900">Testimonios</h1>
          <p className="text-gray-500 mt-1">Gestiona los testimonios de clientes</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Añadir Testimonio
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Cargando...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Proyecto</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Testimonio</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
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
                      No hay testimonios aún. Añade tu primer testimonio.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingTestimonial ? 'Editar Testimonio' : 'Añadir Testimonio'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select label="Cliente" options={clientOptions} {...register('client')} error={errors.client?.message} />
          <Select label="Proyecto" options={projectOptions} {...register('project')} error={errors.project?.message} />
          <Input label="Fecha" type="date" {...register('date')} error={errors.date?.message} />
          <Textarea label="Testimonio" placeholder="Texto del testimonio del cliente..." rows={4} {...register('text')} error={errors.text?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingTestimonial ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar Testimonio">
        <p className="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar este testimonio? Esta acción no se puede deshacer.</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deleteId && deleteMutation.mutate(deleteId)} isLoading={deleteMutation.isPending} className="flex-1">
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
