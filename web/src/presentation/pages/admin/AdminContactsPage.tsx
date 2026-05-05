import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Mail, Eye } from 'lucide-react';
import { Card, Button, Modal } from '../../components/common';
import { contactRepository } from '../../../data/repositories';
import type { Contact } from '../../../domain/entities';

export function AdminContactsPage() {
  const queryClient = useQueryClient();
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: contactRepository.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => contactRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setDeleteId(null);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contactos</h1>
          <p className="text-gray-500 mt-1">Visualiza y gestiona las consultas de contacto</p>
        </div>
      </div>

      <Card>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Cargando...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Nombre</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Correo electrónico</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Mensaje</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact) => (
                  <tr key={contact.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{contact.name}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {contact.email}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 truncate max-w-md">{contact.message}</td>
                    <td className="py-4 px-4 text-gray-700">{new Date(contact.date).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewingContact(contact)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => setDeleteId(contact.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!contacts || contacts.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No hay consultas de contacto aún.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={!!viewingContact} onClose={() => setViewingContact(null)} title="Detalles del Contacto">
        {viewingContact && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Nombre</label>
              <p className="mt-1 text-gray-900">{viewingContact.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Correo electrónico</label>
              <p className="mt-1 text-gray-900">{viewingContact.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Fecha</label>
              <p className="mt-1 text-gray-900">{new Date(viewingContact.date).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Mensaje</label>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">{viewingContact.message}</p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="secondary" onClick={() => setViewingContact(null)} className="flex-1">
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar Contacto">
        <p className="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar esta consulta de contacto? Esta acción no se puede deshacer.</p>
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
