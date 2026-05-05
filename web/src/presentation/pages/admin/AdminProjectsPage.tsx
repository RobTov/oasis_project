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
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  date: z.string().min(1, 'La fecha es obligatoria'),
  client: z.string().min(1, 'El cliente es obligatorio'),
  service: z.string().min(1, 'El servicio es obligatorio'),
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
          <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
          <p className="text-gray-500 mt-1">Gestiona los proyectos de tus clientes</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Proyecto
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Título</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Servicio</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
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
                      Aún no hay proyectos. Crea tu primer proyecto.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingProject ? 'Editar Proyecto' : 'Agregar Proyecto'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Título" placeholder="Título del proyecto" {...register('title')} error={errors.title?.message} />
          <Select label="Cliente" options={clientOptions} {...register('client')} error={errors.client?.message} />
          <Select label="Servicio" options={serviceOptions} {...register('service')} error={errors.service?.message} />
          <Input label="Fecha" type="date" {...register('date')} error={errors.date?.message} />
          <Textarea label="Descripción" placeholder="Descripción del proyecto..." rows={4} {...register('description')} error={errors.description?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">Cancelar</Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingProject ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar Proyecto">
        <p className="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">Cancelar</Button>
          <Button variant="danger" onClick={() => deleteId && deleteMutation.mutate(deleteId)} isLoading={deleteMutation.isPending} className="flex-1">Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}
