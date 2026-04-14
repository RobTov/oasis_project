import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, Button, Input, Textarea, Modal } from '../../components/common';
import { serviceRepository } from '../../../data/repositories';
import type { Service, ServiceCreate } from '../../../domain/entities';

const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  category: z.string().min(1, 'Category is required'),
});

type ServiceForm = z.infer<typeof serviceSchema>;

export function AdminServicesPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: serviceRepository.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: ServiceCreate) => serviceRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ServiceCreate> }) =>
      serviceRepository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => serviceRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      setDeleteId(null);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
  });

  const openCreateModal = () => {
    setEditingService(null);
    reset({ name: '', description: '', price: '', category: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    reset({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      category: service.category,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    reset({ name: '', description: '', price: '', category: '' });
  };

  const onSubmit = (data: ServiceForm) => {
    const payload = {
      ...data,
      price: parseFloat(data.price),
    };
    
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 mt-1">Manage your agency services</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Price</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services?.map((service) => (
                  <tr key={service.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{service.description}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {service.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">${service.price}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => setDeleteId(service.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!services || services.length === 0) && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No services yet. Create your first service.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingService ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" placeholder="Service name" {...register('name')} error={errors.name?.message} />
          <Input label="Category" placeholder="e.g., Marketing, Design" {...register('category')} error={errors.category?.message} />
          <Input label="Price" type="number" step="0.01" placeholder="0.00" {...register('price')} error={errors.price?.message} />
          <Textarea label="Description" placeholder="Describe the service..." rows={4} {...register('description')} error={errors.description?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingService ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Service">
        <p className="text-gray-600 mb-6">Are you sure you want to delete this service? This action cannot be undone.</p>
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
