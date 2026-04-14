import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, Button, Input, Textarea, Select, Modal } from '../../components/common';
import { projectRepository, serviceRepository, dashboardRepository } from '../../../data/repositories';
import type { Project, ProjectCreate } from '../../../domain/entities';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  client: z.string().min(1, 'Client is required'),
  service: z.string().min(1, 'Service is required'),
});

type ProjectForm = z.infer<typeof projectSchema>;

export function AdminProjectsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectRepository.getAll,
  });

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: dashboardRepository.getClients,
  });

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: serviceRepository.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: ProjectCreate) => projectRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProjectCreate> }) =>
      projectRepository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => projectRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setDeleteId(null);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
  });

  const openCreateModal = () => {
    setEditingProject(null);
    reset({ title: '', description: '', date: new Date().toISOString().split('T')[0], client: '', service: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    reset({
      title: project.title,
      description: project.description,
      date: project.date,
      client: project.client.toString(),
      service: project.service.toString(),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    reset({ title: '', description: '', date: '', client: '', service: '' });
  };

  const onSubmit = (data: ProjectForm) => {
    const payload = {
      ...data,
      client: parseInt(data.client),
      service: parseInt(data.service),
    };
    
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: payload });
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
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Manage your client projects</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects?.map((project) => (
                  <tr key={project.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{project.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{project.description}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{project.client_name}</td>
                    <td className="py-4 px-4 text-gray-700">{project.service_name}</td>
                    <td className="py-4 px-4 text-gray-700">{new Date(project.date).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(project)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                        <button onClick={() => setDeleteId(project.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!projects || projects.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No projects yet. Create your first project.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingProject ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" placeholder="Project title" {...register('title')} error={errors.title?.message} />
          <Select label="Client" options={clientOptions} {...register('client')} error={errors.client?.message} />
          <Select label="Service" options={serviceOptions} {...register('service')} error={errors.service?.message} />
          <Input label="Date" type="date" {...register('date')} error={errors.date?.message} />
          <Textarea label="Description" placeholder="Project description..." rows={4} {...register('description')} error={errors.description?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">Cancel</Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingProject ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Project">
        <p className="text-gray-600 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">Cancel</Button>
          <Button variant="danger" onClick={() => deleteId && deleteMutation.mutate(deleteId)} isLoading={deleteMutation.isPending} className="flex-1">Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
