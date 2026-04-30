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
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500 mt-1">View and manage contact inquiries</p>
        </div>
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Message</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
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
                      No contact inquiries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={!!viewingContact} onClose={() => setViewingContact(null)} title="Contact Details">
        {viewingContact && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1 text-gray-900">{viewingContact.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-gray-900">{viewingContact.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date</label>
              <p className="mt-1 text-gray-900">{new Date(viewingContact.date).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Message</label>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">{viewingContact.message}</p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="secondary" onClick={() => setViewingContact(null)} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Contact">
        <p className="text-gray-600 mb-6">Are you sure you want to delete this contact inquiry? This action cannot be undone.</p>
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
