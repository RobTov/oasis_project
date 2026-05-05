import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { serviceRepository } from '../../../data/repositories';

export function ServicesPage() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: serviceRepository.getAll,
  });

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Servicios
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones integrales diseñadas para impulsar tu marca al siguiente nivel
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16 text-gray-500">Cargando servicios...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                    <p className="text-3xl font-bold text-gray-900">${service.price}</p>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Estrategia personalizada
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Soporte dedicado
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Resultados medibles
                    </li>
                  </ul>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Solicitar cotización
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
              {(!services || services.length === 0) && (
                <div className="col-span-full text-center py-16 text-gray-500">
                  <p className="text-xl">Servicios próximamente...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">¿No encuentras lo que buscas?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Contáctanos y crearemos una solución personalizada para tu negocio
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl"
          >
            Contactar Ahora
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
