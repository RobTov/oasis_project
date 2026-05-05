from django.core.management.base import BaseCommand
from oasis_api.models import User, Client, Service, Project, Team, BlogPost, UserTestimonial, Contact, Campaign, Subscriber
from django.utils import timezone
from datetime import timedelta


class Command(BaseCommand):
    help = 'Poblar la base de datos con datos de prueba'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creando datos de prueba...')

        admin_user = User.objects.create_user(
            username='admin',
            first_name='Admin',
            last_name='Oasis',
            email='admin@oasis.com',
            password='admin123',
            role='administrator'
        )
        client_user = User.objects.create_user(
            username='jsmith',
            first_name='Juan',
            last_name='Pérez',
            email='juan@cliente.com',
            password='cliente123',
            role='client'
        )

        client1 = Client.objects.create(
            name='María García',
            company='TechCorp Inc.',
            email='maria@techcorp.com',
            phone='+34 612 345 678',
            sector='Tecnología'
        )
        client2 = Client.objects.create(
            name='Carlos López',
            company='Fashionista Ltd.',
            email='carlos@fashionista.com',
            phone='+34 623 456 789',
            sector='Moda'
        )
        client3 = Client.objects.create(
            name='Ana Martínez',
            company='HealthPlus',
            email='ana@healthplus.com',
            phone='+34 634 567 890',
            sector='Salud'
        )

        service1 = Service.objects.create(
            name='Marketing Digital',
            description='Soluciones completas de marketing digital para empresas. Incluye gestión de redes sociales, publicidad online, email marketing y análisis de métricas para optimizar tus campañas.',
            price=1500.00,
            category='Marketing'
        )
        service2 = Service.objects.create(
            name='Identidad de Marca',
            description='Diseño profesional de identidad de marca. Creamos logotipos, paletas de colores, tipografías y guías de estilo que reflejan la esencia de tu negocio.',
            price=2500.00,
            category='Diseño'
        )
        service3 = Service.objects.create(
            name='Gestión de Redes Sociales',
            description='Gestión completa de cuentas en redes sociales. Creación de contenido, programación de publicaciones, interacción con la comunidad y reportes mensuales.',
            price=800.00,
            category='Redes Sociales'
        )
        service4 = Service.objects.create(
            name='Optimización SEO',
            description='Servicios de posicionamiento en buscadores. Auditoría técnica, optimización de contenido, estrategia de palabras clave y construcción de enlaces.',
            price=1200.00,
            category='SEO'
        )
        service5 = Service.objects.create(
            name='Diseño Web',
            description='Diseño y desarrollo de sitios web modernos y responsivos. Interfaces intuitivas, optimización de velocidad y experiencia de usuario excepcional.',
            price=3000.00,
            category='Desarrollo'
        )
        service6 = Service.objects.create(
            name='Publicidad Online',
            description='Campañas publicitarias en Google Ads, Facebook Ads, Instagram Ads y otras plataformas. Maximizamos tu retorno de inversión con estrategias basadas en datos.',
            price=1800.00,
            category='Publicidad'
        )

        project1 = Project.objects.create(
            title='Rediseño Web TechCorp',
            description='Rediseño completo del sitio web corporativo con enfoque en experiencia de usuario, velocidad de carga y conversión de visitantes en clientes potenciales.',
            date=timezone.now().date(),
            client=client1,
            service=service5
        )
        project2 = Project.objects.create(
            title='Campaña de Moda Primavera',
            description='Campaña integral de marketing para la colección de primavera incluyendo fotografía de producto, contenido para redes sociales y anuncios pagados.',
            date=timezone.now().date() - timedelta(days=30),
            client=client2,
            service=service2
        )
        project3 = Project.objects.create(
            title='SEO para Portal de Salud',
            description='Optimización SEO completa para el portal de información de salud, logrando un aumento del 150% en tráfico orgánico en 3 meses.',
            date=timezone.now().date() - timedelta(days=15),
            client=client3,
            service=service4
        )
        project4 = Project.objects.create(
            title='Estrategia Digital TechCorp',
            description='Implementación de estrategia de marketing digital multicanal con enfoque en generación de leads y aumento de la presencia online.',
            date=timezone.now().date() - timedelta(days=45),
            client=client1,
            service=service1
        )

        team1 = Team.objects.create(
            name='Laura Sánchez',
            role='Directora Creativa',
            bio='Más de 10 años de experiencia en diseño creativo y dirección de arte para marcas internacionales. Especialista en branding y comunicación visual.',
            url_picture='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
        )
        team2 = Team.objects.create(
            name='Miguel Ángel Torres',
            role='Director de Marketing',
            bio='Experto en estrategias de marketing digital con experiencia en empresas Fortune 500. Especializado en growth hacking y analítica web.',
            url_picture='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        )
        team3 = Team.objects.create(
            name='Elena Ruiz',
            role='Especialista SEO',
            bio='Certificada en Google Analytics y SEO técnico. Ha trabajado con más de 200 empresas para mejorar su posicionamiento en buscadores.',
            url_picture='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
        )
        team4 = Team.objects.create(
            name='Pablo Fernández',
            role='Desarrollador Web Senior',
            bio='Desarrollador full-stack con pasión por crear experiencias web excepcionales. Experto en React, Node.js y arquitecturas cloud.',
            url_picture='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
        )

        blogpost1 = BlogPost.objects.create(
            title='10 Consejos para Mejorar tu Marketing Digital',
            content='En este artículo exploramos diez estrategias esenciales para mejorar tus esfuerzos de marketing digital. Desde la optimización de tu sitio web hasta la creación de contenido relevante, cubrimos todo lo que necesitas saber para destacar en el mundo digital. La clave está en entender a tu audiencia, crear contenido de valor y medir constantemente tus resultados para ajustar la estrategia.',
            author=admin_user,
            date_published=timezone.now().date(),
            category='Marketing'
        )
        blogpost2 = BlogPost.objects.create(
            title='El Futuro de la Identidad de Marca',
            content='La identidad de marca está evolucionando rápidamente. Descubre cómo las tendencias actuales en diseño, los cambios en el comportamiento del consumidor y las nuevas tecnologías están transformando la forma en que las marcas se comunican con su audiencia. Aprende a mantener tu marca relevante y conectar emocionalmente con tus clientes.',
            author=admin_user,
            date_published=timezone.now().date() - timedelta(days=7),
            category='Diseño'
        )
        blogpost3 = BlogPost.objects.create(
            title='Mejores Prácticas de SEO para 2024',
            content='La optimización para motores de búsqueda continúa evolucionando. Estas son las últimas mejores prácticas que debes implementar: optimización Core Web Vitals, contenido E-E-A-T, estrategia de palabras clave long-tail, link building de calidad y optimización para búsqueda por voz. Mantente actualizado para no perder posiciones en los resultados.',
            author=client_user,
            date_published=timezone.now().date() - timedelta(days=14),
            category='SEO'
        )
        blogpost4 = BlogPost.objects.create(
            title='Cómo Crear una Estrategia de Contenidos Exitosa',
            content='Una estrategia de contenidos bien planificada es fundamental para el éxito de cualquier marca online. Aprende a definir tus objetivos, conocer a tu audiencia, crear un calendario editorial y medir el impacto de tus publicaciones. Incluye ejemplos prácticos y plantillas descargables.',
            author=admin_user,
            date_published=timezone.now().date() - timedelta(days=21),
            category='Marketing'
        )

        testimonial1 = UserTestimonial.objects.create(
            client=client1,
            text='Oasis Promotions transformó completamente nuestra presencia digital. El equipo fue profesional, creativo y los resultados superaron nuestras expectativas. Nuestra tasa de conversión aumentó un 200% en solo 3 meses.',
            date=timezone.now().date(),
            project=project1
        )
        testimonial2 = UserTestimonial.objects.create(
            client=client2,
            text='Increíbles resultados en nuestra campaña de moda. El equipo creativo captó perfectamente la esencia de nuestra marca y la tradujo en una campaña visualmente impactante. ¡Totalmente recomendados!',
            date=timezone.now().date() - timedelta(days=10),
            project=project2
        )
        testimonial3 = UserTestimonial.objects.create(
            client=client3,
            text='Gracias a la estrategia SEO de Oasis, nuestro portal de salud ahora aparece en las primeras posiciones de Google. El tráfico orgánico se triplicó y las consultas de pacientes aumentaron significativamente.',
            date=timezone.now().date() - timedelta(days=5),
            project=project3
        )

        contact1 = Contact.objects.create(
            name='Roberto Díaz',
            email='roberto@email.com',
            message='Estoy interesado en sus servicios de marketing digital para mi empresa de tecnología. Me gustaría recibir una cotización y agendar una reunión para discutir nuestros objetivos.',
            date=timezone.now().date()
        )
        contact2 = Contact.objects.create(
            name='Patricia Navarro',
            email='patricia@email.com',
            message='Necesito una cotización para el rediseño de nuestro sitio web corporativo. Somos una empresa del sector salud con presencia en toda España.',
            date=timezone.now().date() - timedelta(days=2)
        )

        campaign1 = Campaign.objects.create(
            client=client1,
            service=service1,
            start_date=timezone.now().date(),
            end_date=timezone.now().date() + timedelta(days=30),
            metrics={'impressions': 150000, 'clicks': 4500, 'conversions': 225}
        )
        campaign2 = Campaign.objects.create(
            client=client2,
            service=service2,
            start_date=timezone.now().date() - timedelta(days=10),
            end_date=timezone.now().date() + timedelta(days=20),
            metrics={'impressions': 85000, 'clicks': 2800, 'conversions': 140}
        )
        campaign3 = Campaign.objects.create(
            client=client3,
            service=service4,
            start_date=timezone.now().date() - timedelta(days=60),
            end_date=timezone.now().date() + timedelta(days=30),
            metrics={'impressions': 200000, 'clicks': 8000, 'conversions': 400}
        )

        subscriber1 = Subscriber.objects.create(
            email='suscriptor1@email.com',
            date=timezone.now().date()
        )
        subscriber2 = Subscriber.objects.create(
            email='suscriptor2@email.com',
            date=timezone.now().date() - timedelta(days=5)
        )
        subscriber3 = Subscriber.objects.create(
            email='suscriptor3@email.com',
            date=timezone.now().date() - timedelta(days=10)
        )
        subscriber4 = Subscriber.objects.create(
            email='suscriptor4@email.com',
            date=timezone.now().date() - timedelta(days=15)
        )

        self.stdout.write(self.style.SUCCESS('¡Datos de prueba creados exitosamente!'))
