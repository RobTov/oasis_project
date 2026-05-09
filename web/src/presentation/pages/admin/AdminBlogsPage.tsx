import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, Button, Input, Textarea, Select, Modal } from '../../components/common';
import { blogRepository, userRepository } from '../../../data/repositories';
import type { BlogPost, BlogPostCreate } from '../../../domain/entities';

const blogSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  content: z.string().min(1, 'El contenido es obligatorio'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  date_published: z.string().min(1, 'La fecha es obligatoria'),
  author: z.string().min(1, 'El autor es obligatorio'),
});

type BlogForm = z.infer<typeof blogSchema>;

export function AdminBlogsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogRepository.getAll,
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: userRepository.getAll,
  });

  const authorOptions = users?.map(u => ({ value: u.id.toString(), label: `${u.name || u.username} (${u.email})` })) || [];

  const createMutation = useMutation({
    mutationFn: (data: BlogPostCreate) => blogRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<BlogPostCreate> }) =>
      blogRepository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => blogRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setDeleteId(null);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
  });

  const openCreateModal = () => {
    setEditingBlog(null);
    reset({
      title: '',
      content: '',
      category: '',
      date_published: new Date().toISOString().split('T')[0],
      author: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    reset({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      date_published: blog.date_published,
      author: blog.author.toString(),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    reset({ title: '', content: '', category: '', date_published: '', author: '' });
  };

  const onSubmit = (data: BlogForm) => {
    const payload = {
      ...data,
      author: parseInt(data.author),
    };
    
    if (editingBlog) {
      updateMutation.mutate({ id: editingBlog.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Publicaciones del Blog</h1>
          <p className="text-gray-500 mt-1">Gestiona el blog de tu agencia</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Publicación
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Autor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Categoría</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {blogs?.map((blog) => (
                  <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{blog.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">{blog.content}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{blog.author_name}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {blog.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{new Date(blog.date_published).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(blog)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                        <button onClick={() => setDeleteId(blog.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!blogs || blogs.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      Aún no hay publicaciones. Crea tu primera publicación.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingBlog ? 'Editar Publicación' : 'Agregar Publicación'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Título" placeholder="Título de la publicación" {...register('title')} error={errors.title?.message} />
          <Select label="Autor" options={authorOptions} {...register('author')} error={errors.author?.message} />
          <Input label="Categoría" placeholder="ej. Marketing, Consejos" {...register('category')} error={errors.category?.message} />
          <Input label="Fecha de Publicación" type="date" {...register('date_published')} error={errors.date_published?.message} />
          <Textarea label="Contenido" placeholder="Escribe el contenido de tu publicación..." rows={6} {...register('content')} error={errors.content?.message} />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">Cancelar</Button>
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending} className="flex-1">
              {editingBlog ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar Publicación">
        <p className="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer.</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1">Cancelar</Button>
          <Button variant="danger" onClick={() => deleteId && deleteMutation.mutate(deleteId)} isLoading={deleteMutation.isPending} className="flex-1">Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}
