import { useQuery } from '@tanstack/react-query';
import { dashboardRepository } from '../../../data/repositories';
import { Users, Mail } from 'lucide-react';

export function TeamPage() {
  const { data: team, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: dashboardRepository.getTeam,
  });

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Nuestro{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Equipo
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Profesionales apasionados que hacen posible la excelencia en cada proyecto
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16 text-gray-500">Cargando equipo...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team?.map((member) => (
                <div key={member.id} className="text-center group">
                  <div className="relative mb-6 mx-auto w-48 h-48">
                    {member.url_picture ? (
                      <img
                        src={member.url_picture}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                        <Users className="w-16 h-16 text-indigo-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm line-clamp-3">{member.bio}</p>
                </div>
              ))}
              {(!team || team.length === 0) && (
                <div className="col-span-full text-center py-16 text-gray-500">
                  <p className="text-xl">Miembros del equipo próximamente...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Quieres unirte a nuestro equipo?</h2>
          <p className="text-xl text-indigo-100 mb-10">
            Siempre buscamos talentos apasionados por la creatividad y la innovación
          </p>
          <a
            href="mailto:trabaja@oasis.com"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-xl"
          >
            <Mail className="w-5 h-5" />
            Enviar CV
          </a>
        </div>
      </section>
    </div>
  );
}
