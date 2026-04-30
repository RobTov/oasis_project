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
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().min(1, 'Bio is required'),
  url_picture: z.string().url('Invalid URL').optional().or(z.literal('')),
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
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-500 mt-1">Manage your team members</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Member</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Bio</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
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
                      No team members yet. Add your first member.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingTeam ? 'Edit Member' : 'Add Member'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" placeholder="Full name" {...register('name')} error={errors.name?.message} />
          <Input label="Role" placeholder="e.g., Developer, Designer" {...register('role')} error={errors.role?.message} />
          <Input label="Profile Picture URL" placeholder="https://..." {...register('url_picture')} error={errors.url_picture?.message} />
          <Textarea label="Bio" placeholder="Short bio..." rows={4} {...register('bio')} error={errors.bio?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingTeam ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Member">
        <p className="text-gray-600 mb-6">Are you sure you want to remove this team member? This action cannot be undone.</p>
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
