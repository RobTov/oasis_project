import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, Button, Input, Textarea, Modal } from '../../components/common';
import { teamRepository } from '../../../data/repositories';
import type { Team, TeamCreate } from '../../../domain/entities';

const teamSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  role: z.string().min(1, 'El cargo es obligatorio'),
  bio: z.string().min(1, 'La biografía es obligatoria'),
  url_picture: z.string().url('URL inválida').optional().or(z.literal('')),
});

type TeamForm = z.infer<typeof teamSchema>;

export function AdminTeamPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: team, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: teamRepository.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: TeamCreate) => teamRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TeamCreate> }) =>
      teamRepository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => teamRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      setDeleteId(null);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamForm>({
    resolver: zodResolver(teamSchema),
  });

  const openCreateModal = () => {
    setEditingTeam(null);
    reset({ name: '', role: '', bio: '', url_picture: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (member: Team) => {
    setEditingTeam(member);
    reset({
      name: member.name,
      role: member.role,
      bio: member.bio,
      url_picture: member.url_picture || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTeam(null);
    reset({ name: '', role: '', bio: '', url_picture: '' });
  };

  const onSubmit = (data: TeamForm) => {
    const payload: Partial<TeamCreate> = {
      name: data.name,
      role: data.role,
      bio: data.bio,
    };
    if (data.url_picture) {
      payload.url_picture = data.url_picture;
    }
    
    if (editingTeam) {
      updateMutation.mutate({ id: editingTeam.id, data: payload });
    } else {
      createMutation.mutate(payload as TeamCreate);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Equipo</h1>
          <p className="text-gray-500 mt-1">Gestiona los miembros del equipo</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Añadir Miembro
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Miembro</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Cargo</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Biografía</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {team?.map((member) => (
                  <tr key={member.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {member.url_picture ? (
                          <img src={member.url_picture} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                            {member.name.charAt(0)}
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700 truncate max-w-md">{member.bio}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => setDeleteId(member.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!team || team.length === 0) && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No hay miembros en el equipo. Añade tu primer miembro.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingTeam ? 'Editar Miembro' : 'Añadir Miembro'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nombre" placeholder="Nombre completo" {...register('name')} error={errors.name?.message} />
          <Input label="Cargo" placeholder="Ej., Desarrollador, Diseñador" {...register('role')} error={errors.role?.message} />
          <Input label="URL de la foto de perfil" placeholder="https://..." {...register('url_picture')} error={errors.url_picture?.message} />
          <Textarea label="Biografía" placeholder="Breve biografía..." rows={4} {...register('bio')} error={errors.bio?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingTeam ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar Miembro">
        <p className="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar a este miembro del equipo? Esta acción no se puede deshacer.</p>
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
