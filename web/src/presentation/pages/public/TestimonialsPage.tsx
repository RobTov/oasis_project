import { useQuery } from '@tanstack/react-query';
import { testimonialRepository } from '../../../data/repositories';
import { Quote, Calendar, Building2 } from 'lucide-react';

export function TestimonialsPage() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: testimonialRepository.getAll,
  });

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Lo Que Dicen Nuestros{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Clientes
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Testimonios reales de clientes satisfechos que confiaron en nosotros
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16 text-gray-500">Cargando testimonios...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials?.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Quote className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg leading-relaxed italic">"{testimonial.text}"</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{testimonial.client_name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(testimonial.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  {testimonial.project_title && (
                    <div className="mt-3">
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">
                        Proyecto: {testimonial.project_title}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {(!testimonials || testimonials.length === 0) && (
                <div className="col-span-full text-center py-16 text-gray-500">
                  <p className="text-xl">Testimonios próximamente...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
