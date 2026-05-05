import { useQuery } from '@tanstack/react-query';
import { campaignRepository } from '../../../data/repositories';
import { Calendar, TrendingUp, Users, Eye } from 'lucide-react';

export function CampaignsPage() {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: campaignRepository.getAll,
  });

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Nuestras{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Campañas
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Campañas de marketing efectivas que generan resultados reales para nuestros clientes
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16 text-gray-500">Cargando campañas...</div>
          ) : (
            <div className="space-y-8">
              {campaigns?.map((campaign) => {
                const metrics = campaign.metrics as Record<string, number> | null;
                const startDate = new Date(campaign.start_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
                const endDate = new Date(campaign.end_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

                return (
                  <div
                    key={campaign.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2" />
                    <div className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                              {campaign.service_name}
                            </span>
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{campaign.client_name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{startDate} - {endDate}</span>
                          </div>
                        </div>
                        {metrics && (
                          <div className="flex flex-wrap gap-6">
                            {metrics.impressions && (
                              <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mx-auto mb-2">
                                  <Eye className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{metrics.impressions.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Impresiones</p>
                              </div>
                            )}
                            {metrics.clicks && (
                              <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mx-auto mb-2">
                                  <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{metrics.clicks.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Clics</p>
                              </div>
                            )}
                            {metrics.conversions && (
                              <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl mx-auto mb-2">
                                  <Users className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{metrics.conversions.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Conversiones</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {(!campaigns || campaigns.length === 0) && (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-xl">Campañas próximamente...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
