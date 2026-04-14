import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Sparkles, TrendingUp, Users, Award, Star } from 'lucide-react';
import { serviceRepository, projectRepository, dashboardRepository } from '../../../data/repositories';

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

  const features = [
    {
      icon: Sparkles,
      title: 'Creative Solutions',
      description: 'Innovative strategies tailored to elevate your brand presence',
    },
    {
      icon: TrendingUp,
      title: 'Measurable Results',
      description: 'Data-driven campaigns that deliver tangible growth',
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'Experts committed to your success around the clock',
    },
    {
      icon: Award,
      title: 'Industry Expertise',
      description: 'Years of experience across diverse market segments',
    },
  ];

  return (
    <div className="pt-16">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Trusted by 100+ businesses worldwide
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Elevate Your Brand with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Creative Excellence
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Oasis Promotions Agency transforms visions into impactful marketing strategies. 
                We craft compelling narratives that resonate with your audience and drive results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 transition-colors"
                >
                  Client Login
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
                      <p className="text-gray-500 text-sm">Average ROI</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Oasis</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine creativity with strategy to deliver exceptional results for your business
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

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for your growth</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.slice(0, 6).map((service) => (
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
            {(!services || services.length === 0) && (
              <div className="col-span-full text-center py-12 text-gray-500">
                Services coming soon...
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-300">Success stories that speak for themselves</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.slice(0, 6).map((project) => (
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
            {(!projects || projects.length === 0) && (
              <div className="col-span-full text-center py-12 text-slate-400">
                Projects coming soon...
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The creative minds behind your success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team?.slice(0, 4).map((member) => (
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
            {(!team || team.length === 0) && (
              <div className="col-span-full text-center py-12 text-gray-500">
                Team members coming soon...
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Let's create something extraordinary together. Start your journey with Oasis today.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg" />
                <span className="text-2xl font-bold">Oasis</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Oasis Promotions Agency is a full-service creative agency dedicated to helping 
                brands grow through innovative marketing strategies and compelling storytelling.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Brand Strategy</li>
                <li>Digital Marketing</li>
                <li>Creative Design</li>
                <li>Content Creation</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2024 Oasis Promotions Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
