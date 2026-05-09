import { useQuery } from '@tanstack/react-query';
import { Card } from '../../components/common';
import { serviceRepository, projectRepository, blogRepository, clientRepository, teamRepository, campaignRepository, subscriberRepository, testimonialRepository, contactRepository, userRepository } from '../../../data/repositories';
import { Wrench, FolderKanban, FileText, Building2, Users, Megaphone, Mail, MessageSquare, UserCog, UserCheck } from 'lucide-react';

export function AdminResumenPage() {
  const { data: services } = useQuery({ queryKey: ['services'], queryFn: serviceRepository.getAll });
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: projectRepository.getAll });
  const { data: blogs } = useQuery({ queryKey: ['blogs'], queryFn: blogRepository.getAll });
  const { data: clients } = useQuery({ queryKey: ['clients'], queryFn: clientRepository.getAll });
  const { data: team } = useQuery({ queryKey: ['team'], queryFn: teamRepository.getAll });
  const { data: campaigns } = useQuery({ queryKey: ['campaigns'], queryFn: campaignRepository.getAll });
  const { data: subscribers } = useQuery({ queryKey: ['subscribers'], queryFn: subscriberRepository.getAll });
  const { data: testimonials } = useQuery({ queryKey: ['testimonials'], queryFn: testimonialRepository.getAll });
  const { data: contacts } = useQuery({ queryKey: ['contacts'], queryFn: contactRepository.getAll });
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: userRepository.getAll });

  const stats = [
    { label: 'Servicios', value: services?.length ?? 0, icon: Wrench, color: 'blue' },
    { label: 'Proyectos', value: projects?.length ?? 0, icon: FolderKanban, color: 'green' },
    { label: 'Blog', value: blogs?.length ?? 0, icon: FileText, color: 'purple' },
    { label: 'Clientes', value: clients?.length ?? 0, icon: Building2, color: 'orange' },
    { label: 'Equipo', value: team?.length ?? 0, icon: UserCheck, color: 'pink' },
    { label: 'Campañas', value: campaigns?.length ?? 0, icon: Megaphone, color: 'cyan' },
    { label: 'Suscriptores', value: subscribers?.length ?? 0, icon: Mail, color: 'teal' },
    { label: 'Testimonios', value: testimonials?.length ?? 0, icon: MessageSquare, color: 'indigo' },
    { label: 'Contactos', value: contacts?.length ?? 0, icon: UserCog, color: 'red' },
    { label: 'Usuarios', value: users?.length ?? 0, icon: Users, color: 'slate' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    teal: 'bg-teal-100 text-teal-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    red: 'bg-red-100 text-red-600',
    slate: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resumen</h1>
        <p className="text-gray-500 mt-1">Vista general del panel de administración</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${colorMap[stat.color]}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
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
            {(!services || services.length === 0) && <p className="text-gray-500 text-center py-4">Aún no hay servicios</p>}
          </div>
        </Card>

        <Card title="Proyectos Recientes" icon={FolderKanban}>
          <div className="space-y-4">
            {projects?.slice(0, 5).map((project) => (
              <div key={project.id} className="py-2 border-b border-gray-100 last:border-0">
                <p className="font-medium text-gray-900">{project.title}</p>
                <p className="text-sm text-gray-500">{project.client_name} • {project.service_name}</p>
              </div>
            ))}
            {(!projects || projects.length === 0) && <p className="text-gray-500 text-center py-4">Aún no hay proyectos</p>}
          </div>
        </Card>

        <Card title="Últimos Clientes" icon={Building2}>
          <div className="space-y-4">
            {clients?.slice(0, 5).map((client) => (
              <div key={client.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.company}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{client.sector}</span>
              </div>
            ))}
            {(!clients || clients.length === 0) && <p className="text-gray-500 text-center py-4">Aún no hay clientes</p>}
          </div>
        </Card>

        <Card title="Campañas Activas" icon={Megaphone}>
          <div className="space-y-4">
            {campaigns?.slice(0, 5).map((campaign) => (
              <div key={campaign.id} className="py-2 border-b border-gray-100 last:border-0">
                <p className="font-medium text-gray-900">{campaign.client_name}</p>
                <p className="text-sm text-gray-500">{campaign.service_name} • {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}</p>
              </div>
            ))}
            {(!campaigns || campaigns.length === 0) && <p className="text-gray-500 text-center py-4">Aún no hay campañas</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
