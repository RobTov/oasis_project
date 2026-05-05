import { useQuery } from '@tanstack/react-query';
import { Card } from '../../components/common';
import { serviceRepository, projectRepository, blogRepository, dashboardRepository } from '../../../data/repositories';
import { Users, Briefcase, FileText, Wrench, Building2, Megaphone } from 'lucide-react';

export function DashboardPage() {
  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: serviceRepository.getAll,
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: projectRepository.getAll,
  });

  const { data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogRepository.getAll,
  });

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: dashboardRepository.getClients,
  });

  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: dashboardRepository.getTeam,
  });

  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: dashboardRepository.getCampaigns,
  });

  const stats = [
    { label: 'Servicios', value: services?.length ?? 0, icon: Wrench, color: 'blue' },
    { label: 'Proyectos', value: projects?.length ?? 0, icon: Briefcase, color: 'green' },
    { label: 'Publicaciones del Blog', value: blogs?.length ?? 0, icon: FileText, color: 'purple' },
    { label: 'Clientes', value: clients?.length ?? 0, icon: Building2, color: 'orange' },
    { label: 'Miembros del Equipo', value: team?.length ?? 0, icon: Users, color: 'pink' },
    { label: 'Campañas', value: campaigns?.length ?? 0, icon: Megaphone, color: 'cyan' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
    cyan: 'bg-cyan-100 text-cyan-600',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-gray-500 mt-1">Resumen de tu Agencia de Promociones Oasis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${colorMap[stat.color]}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Servicios Recientes" icon={Wrench}>
          <div className="space-y-4">
            {services?.slice(0, 5).map((service) => (
              <div key={service.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.category}</p>
                </div>
                <p className="font-semibold text-gray-900">${service.price}</p>
              </div>
            ))}
            {(!services || services.length === 0) && (
              <p className="text-gray-500 text-center py-4">Aún no hay servicios</p>
            )}
          </div>
        </Card>

        <Card title="Proyectos Recientes" icon={Briefcase}>
          <div className="space-y-4">
            {projects?.slice(0, 5).map((project) => (
              <div key={project.id} className="py-2 border-b border-gray-100 last:border-0">
                <p className="font-medium text-gray-900">{project.title}</p>
                <p className="text-sm text-gray-500">{project.client_name} • {project.service_name}</p>
              </div>
            ))}
            {(!projects || projects.length === 0) && (
              <p className="text-gray-500 text-center py-4">Aún no hay proyectos</p>
            )}
          </div>
        </Card>

        <Card title="Últimas Publicaciones del Blog" icon={FileText}>
          <div className="space-y-4">
            {blogs?.slice(0, 5).map((blog) => (
              <div key={blog.id} className="py-2 border-b border-gray-100 last:border-0">
                <p className="font-medium text-gray-900">{blog.title}</p>
                <p className="text-sm text-gray-500">{blog.author_name} • {new Date(blog.date_published).toLocaleDateString()}</p>
              </div>
            ))}
            {(!blogs || blogs.length === 0) && (
              <p className="text-gray-500 text-center py-4">Aún no hay publicaciones</p>
            )}
          </div>
        </Card>

        <Card title="Nuestro Equipo" icon={Users}>
          <div className="space-y-4">
            {team?.slice(0, 5).map((member) => (
              <div key={member.id} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
                {member.url_picture ? (
                  <img src={member.url_picture} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
            {(!team || team.length === 0) && (
              <p className="text-gray-500 text-center py-4">Aún no hay miembros del equipo</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
