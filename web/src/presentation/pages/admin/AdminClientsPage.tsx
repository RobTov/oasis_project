import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, Button, Input, Modal } from '../../components/common';
import { clientRepository } from '../../../data/repositories';
import type { Client, ClientCreate } from '../../../domain/entities';

const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  sector: z.string().min(1, 'Sector is required'),
});

type ClientForm = z.infer<typeof clientSchema>;

export function AdminClientsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: clientRepository.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: ClientCreate) => clientRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ClientCreate> }) =>
      clientRepository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => clientRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setDeleteId(null);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
  });

  const openCreateModal = () => {
    setEditingClient(null);
    reset({ name: '', company: '', email: '', phone: '', sector: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (client: Client) => {
    setEditingClient(client);
    reset({
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      sector: client.sector,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
    reset({ name: '', company: '', email: '', phone: '', sector: '' });
  };

  const onSubmit = (data: ClientForm) => {
    if (editingClient) {
      updateMutation.mutate({ id: editingClient.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1">Manage your agency clients</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Sector</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((client) => (
                  <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{client.name}</td>
                    <td className="py-4 px-4 text-gray-700">{client.company}</td>
                    <td className="py-4 px-4 text-gray-700">{client.email}</td>
                    <td className="py-4 px-4 text-gray-700">{client.phone}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {client.sector}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(client)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => setDeleteId(client.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!clients || clients.length === 0) && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No clients yet. Create your first client.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingClient ? 'Edit Client' : 'Add Client'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" placeholder="Client name" {...register('name')} error={errors.name?.message} />
          <Input label="Company" placeholder="Company name" {...register('company')} error={errors.company?.message} />
          <Input label="Email" type="email" placeholder="client@email.com" {...register('email')} error={errors.email?.message} />
          <Input label="Phone" placeholder="Phone number" {...register('phone')} error={errors.phone?.message} />
          <Input label="Sector" placeholder="e.g., Technology, Finance" {...register('sector')} error={errors.sector?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingClient ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Client">
        <p className="text-gray-600 mb-6">Are you sure you want to delete this client? This action cannot be undone.</p>
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
