import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { contactRepository } from '../../../data/repositories';
import { Input, Textarea, Button } from '../../components/common';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Correo electrónico inválido'),
  message: z.string().min(1, 'El mensaje es obligatorio'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; email: string; message: string }) =>
      contactRepository.create({
        ...data,
        date: new Date().toISOString().split('T')[0],
      }),
    onSuccess: () => {
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    },
  });

  const onSubmit = (data: ContactForm) => {
    createMutation.mutate(data);
  };

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Ponte en{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Contacto
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos listos para ayudarte a llevar tu marca al siguiente nivel
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p>¡Mensaje enviado con éxito! Te contactaremos pronto.</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Nombre"
                  placeholder="Tu nombre completo"
                  {...register('name')}
                  error={errors.name?.message}
                />
                <Input
                  label="Correo Electrónico"
                  type="email"
                  placeholder="tu@email.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Textarea
                  label="Mensaje"
                  placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  rows={6}
                  {...register('message')}
                  error={errors.message?.message}
                />
                <Button type="submit" className="w-full" isLoading={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Correo Electrónico</h3>
                    <p className="text-gray-600">info@oasisagency.com</p>
                    <p className="text-gray-600">soporte@oasisagency.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Oficina</h3>
                    <p className="text-gray-600">Av. Principal 1234</p>
                    <p className="text-gray-600">Ciudad, País</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-xl">
                <h3 className="text-xl font-bold mb-2">¿Necesitas una cotización?</h3>
                <p className="text-blue-100 mb-4">
                  Completa el formulario y nuestro equipo te enviará una propuesta personalizada en menos de 24 horas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
