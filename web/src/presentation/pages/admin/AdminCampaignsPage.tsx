import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, Button, Input, Select, Modal } from '../../components/common';
import { campaignRepository, clientRepository, serviceRepository } from '../../../data/repositories';
import type { Campaign, CampaignCreate } from '../../../domain/entities';

const campaignSchema = z.object({
  client: z.string().min(1, 'El cliente es obligatorio'),
  service: z.string().min(1, 'El servicio es obligatorio'),
  start_date: z.string().min(1, 'La fecha de inicio es obligatoria'),
  end_date: z.string().min(1, 'La fecha de fin es obligatoria'),
});

type CampaignForm = z.infer<typeof campaignSchema>;

export function AdminCampaignsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: campaignRepository.getAll,
  });

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: clientRepository.getAll,
  });

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: serviceRepository.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: CampaignCreate) => campaignRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CampaignCreate> }) =>
      campaignRepository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => campaignRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      setDeleteId(null);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignForm>({
    resolver: zodResolver(campaignSchema),
  });

  const openCreateModal = () => {
    setEditingCampaign(null);
    reset({ client: '', service: '', start_date: '', end_date: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    reset({
      client: campaign.client.toString(),
      service: campaign.service.toString(),
      start_date: campaign.start_date,
      end_date: campaign.end_date,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCampaign(null);
    reset({ client: '', service: '', start_date: '', end_date: '' });
  };

  const onSubmit = (data: CampaignForm) => {
    const payload = {
      client: parseInt(data.client),
      service: parseInt(data.service),
      start_date: data.start_date,
      end_date: data.end_date,
    };
    
    if (editingCampaign) {
      updateMutation.mutate({ id: editingCampaign.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const clientOptions = clients?.map(c => ({ value: c.id.toString(), label: c.name })) || [];
  const serviceOptions = services?.map(s => ({ value: s.id.toString(), label: s.name })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campañas</h1>
          <p className="text-gray-500 mt-1">Gestiona tus campañas de marketing</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Añadir Campaña
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Servicio</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha de inicio</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha de fin</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {campaigns?.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{campaign.client_name}</td>
                    <td className="py-4 px-4 text-gray-700">{campaign.service_name}</td>
                    <td className="py-4 px-4 text-gray-700">{new Date(campaign.start_date).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-gray-700">{new Date(campaign.end_date).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(campaign)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => setDeleteId(campaign.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!campaigns || campaigns.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No hay campañas aún. Crea tu primera campaña.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingCampaign ? 'Editar Campaña' : 'Añadir Campaña'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select label="Cliente" options={clientOptions} {...register('client')} error={errors.client?.message} />
          <Select label="Servicio" options={serviceOptions} {...register('service')} error={errors.service?.message} />
          <Input label="Fecha de inicio" type="date" {...register('start_date')} error={errors.start_date?.message} />
          <Input label="Fecha de fin" type="date" {...register('end_date')} error={errors.end_date?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingCampaign ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar Campaña">
        <p className="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar esta campaña? Esta acción no se puede deshacer.</p>
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
