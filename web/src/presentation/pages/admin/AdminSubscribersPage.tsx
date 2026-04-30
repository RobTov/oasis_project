import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Mail } from 'lucide-react';
import { Card, Button, Input, Modal } from '../../components/common';
import { subscriberRepository } from '../../../data/repositories';
import type { Subscriber, SubscriberCreate } from '../../../domain/entities';

const subscriberSchema = z.object({
  email: z.string().email('Invalid email'),
  date: z.string().min(1, 'Date is required'),
});

type SubscriberForm = z.infer<typeof subscriberSchema>;

export function AdminSubscribersPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['subscribers'],
    queryFn: subscriberRepository.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: SubscriberCreate) => subscriberRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SubscriberCreate> }) =>
      subscriberRepository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => subscriberRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      setDeleteId(null);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscriberForm>({
    resolver: zodResolver(subscriberSchema),
  });

  const openCreateModal = () => {
    setEditingSubscriber(null);
    reset({ email: '', date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const openEditModal = (subscriber: Subscriber) => {
    setEditingSubscriber(subscriber);
    reset({
      email: subscriber.email,
      date: subscriber.date,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubscriber(null);
    reset({ email: '', date: '' });
  };

  const onSubmit = (data: SubscriberForm) => {
    if (editingSubscriber) {
      updateMutation.mutate({ id: editingSubscriber.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
          <p className="text-gray-500 mt-1">Manage newsletter subscribers</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Subscriber
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Subscribed</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers?.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{new Date(subscriber.date).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(subscriber)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button
                          onClick={() => setDeleteId(subscriber.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!subscribers || subscribers.length === 0) && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      No subscribers yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingSubscriber ? 'Edit Subscriber' : 'Add Subscriber'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Email" type="email" placeholder="subscriber@email.com" {...register('email')} error={errors.email?.message} />
          <Input label="Date" type="date" {...register('date')} error={errors.date?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingSubscriber ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Subscriber">
        <p className="text-gray-600 mb-6">Are you sure you want to remove this subscriber? This action cannot be undone.</p>
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
