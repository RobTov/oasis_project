import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Sparkles, TrendingUp, Users, Award, Star } from 'lucide-react';
import { serviceRepository, projectRepository, dashboardRepository, blogRepository } from '../../../data/repositories';

export function HomePage() {
  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: serviceRepository.getAll,
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: projectRepository.getAll,
  });

  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: dashboardRepository.getTeam,
  });

  const { data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogRepository.getAll,
  });

  const features = [
    {
      icon: Sparkles,
      title: 'Soluciones Creativas',
      description: 'Estrategias innovadoras personalizadas para elevar la presencia de tu marca',
    },
    {
      icon: TrendingUp,
      title: 'Resultados Medibles',
      description: 'Campañas basadas en datos que generan un crecimiento tangible',
    },
    {
      icon: Users,
      title: 'Equipo Dedicado',
      description: 'Expertos comprometidos con tu éxito las 24 horas',
    },
    {
      icon: Award,
      title: 'Experiencia en la Industria',
      description: 'Años de experiencia en diversos segmentos del mercado',
    },
  ];

  return (
    <div>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Con confianza por más de 100 empresas en todo el mundo
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Eleva Tu Marca con{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Excelencia Creativa
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Oasis Promotions Agency transforma visiones en estrategias de marketing impactantes. 
                Creamos narrativas convincentes que resuenan con tu audiencia y generan resultados.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                >
                  Registrarse
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 transition-colors"
                >
                  Ver Servicios
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl" />
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">250%</p>
                      <p className="text-gray-500 text-sm">ROI Promedio</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por Qué Elegir Oasis</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combinamos creatividad con estrategia para ofrecer resultados excepcionales para tu negocio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {services && services.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
              <p className="text-xl text-gray-600">Soluciones integrales para tu crecimiento</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service) => (
                <div
                  key={service.id}
                  className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                    <p className="text-2xl font-bold text-gray-900">${service.price}</p>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Ver Todos los Servicios
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Proyectos Destacados</h2>
              <p className="text-xl text-slate-300">Historias de éxito que hablan por sí mismas</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="group bg-slate-800 rounded-2xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-80" />
                  <div className="p-6">
                    <p className="text-sm text-slate-400 mb-2">{project.client_name}</p>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-slate-300 text-sm line-clamp-2">{project.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
                        {project.service_name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-medium hover:bg-blue-50 transition-colors"
              >
                Ver Todos los Proyectos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {team && team.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Conoce a Nuestro Equipo</h2>
              <p className="text-xl text-gray-600">Las mentes creativas detrás de tu éxito</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.slice(0, 4).map((member) => (
                <div key={member.id} className="text-center group">
                  <div className="relative mb-6 mx-auto w-48 h-48">
                    {member.url_picture ? (
                      <img
                        src={member.url_picture}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
                        <Users className="w-16 h-16 text-blue-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{member.bio}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/equipo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Conocer al Equipo Completo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {blogs && blogs.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Últimas Publicaciones</h2>
              <p className="text-xl text-gray-600">Consejos y tendencias del mundo del marketing</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(0, 3).map((blog) => (
                <article key={blog.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-40 bg-gradient-to-br from-green-500 to-emerald-500" />
                  <div className="p-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2">{blog.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{blog.content}</p>
                    <p className="text-gray-500 text-sm mt-3">{blog.author_name}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 transition-colors"
              >
                Ver Todas las Publicaciones
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">¿Listo para Transformar Tu Marca?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Creemos algo extraordinario juntos. Comienza tu viaje con Oasis hoy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl"
            >
              Contactar
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-10 py-5 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
