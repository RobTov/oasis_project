import { useQuery } from '@tanstack/react-query';
import { projectRepository } from '../../../data/repositories';
import { Calendar, Building2 } from 'lucide-react';

export function ProjectsPage() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectRepository.getAll,
  });

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Proyectos
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Historias de éxito que demuestran nuestra experiencia y compromiso
          </p>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16 text-gray-500">Cargando proyectos...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Building2 className="w-4 h-4" />
                      <span>{project.client_name}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {project.service_name}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(!projects || projects.length === 0) && (
                <div className="col-span-full text-center py-16 text-gray-500">
                  <p className="text-xl">Proyectos próximamente...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
