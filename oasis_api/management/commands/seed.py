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
            username='cliente1',
            first_name='Sofía',
            last_name='Ramírez',
            email='sofia@email.com',
            password='cliente123',
            role='client'
        )

        client1 = Client.objects.create(
            name='Carolina Mendoza',
            company='InnovaTech Solutions',
            email='carolina@innovatech.com',
            phone='+34 611 223 344',
            sector='Tecnología'
        )
        client2 = Client.objects.create(
            name='Diego Castillo',
            company='EstiloVivo',
            email='diego@estilovivo.com',
            phone='+34 622 334 455',
            sector='Moda'
        )
        client3 = Client.objects.create(
            name='Valentina Rojas',
            company='BioVida Salud',
            email='valentina@biovida.com',
            phone='+34 633 445 566',
            sector='Salud'
        )

        service1 = Service.objects.create(
            name='Marketing Digital Integral',
            description='Estrategia completa de marketing digital que abarca SEO, SEM, redes sociales y email marketing. Ideal para empresas que buscan una presencia online sólida y resultados medibles.',
            price=1800.00,
            category='Marketing'
        )
        service2 = Service.objects.create(
            name='Creación de Marca',
            description='Desarrollamos la identidad visual de tu negocio desde cero: logotipo, papelería corporativa, manual de marca y estrategia de posicionamiento.',
            price=2200.00,
            category='Diseño'
        )
        service3 = Service.objects.create(
            name='Community Management',
            description='Gestión profesional de tus redes sociales con contenido original, programación estratégica y atención personalizada a tu comunidad.',
            price=750.00,
            category='Redes Sociales'
        )
        service4 = Service.objects.create(
            name='Auditoría y Consultoría SEO',
            description='Análisis profundo de tu sitio web para identificar oportunidades de mejora en el posicionamiento orgánico. Incluye informe detallado y plan de acción.',
            price=950.00,
            category='SEO'
        )
        service5 = Service.objects.create(
            name='Desarrollo Web Profesional',
            description='Creación de sitios web corporativos, tiendas online y plataformas a medida con las últimas tecnologías del mercado.',
            price=3500.00,
            category='Desarrollo'
        )
        service6 = Service.objects.create(
            name='Publicidad Programática',
            description='Campañas publicitarias automatizadas basadas en datos de audiencia. Segmentación precisa y optimización continua para maximizar el ROI.',
            price=2100.00,
            category='Publicidad'
        )

        project1 = Project.objects.create(
            title='Plataforma E-commerce InnovaTech',
            description='Desarrollo de tienda online con catálogo dinámico, carrito de compras, pasarela de pago integrada y panel de administración de inventario.',
            date=timezone.now().date(),
            client=client1,
            service=service5
        )
        project2 = Project.objects.create(
            title='Rebranding EstiloVivo',
            description='Renovación completa de la imagen corporativa incluyendo nuevo logotipo, paleta cromática y campaña de lanzamiento multicanal.',
            date=timezone.now().date() - timedelta(days=45),
            client=client2,
            service=service2
        )
        project3 = Project.objects.create(
            title='Estrategia SEO para BioVida',
            description='Implementación de estrategia SEO avanzada que posicionó al portal de salud en el top 3 de Google para más de 50 palabras clave del sector.',
            date=timezone.now().date() - timedelta(days=20),
            client=client3,
            service=service4
        )
        project4 = Project.objects.create(
            title='Campaña Integración Digital InnovaTech',
            description='Campaña 360° de transformación digital combinando publicidad online, email marketing automatizado y optimización de conversión.',
            date=timezone.now().date() - timedelta(days=60),
            client=client1,
            service=service1
        )

        team1 = Team.objects.create(
            name='Andrea García',
            role='Directora de Arte',
            bio='Diseñadora gráfica con más de 12 años de experiencia en branding y dirección creativa. Ha trabajado con marcas como Nike, Zara y Movistar.',
            url_picture='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
        )
        team2 = Team.objects.create(
            name='Fernando Herrera',
            role='Estratega Digital',
            bio='Especialista en marketing digital con enfoque en数据分析 y optimización de campañas. Certificado en Google Ads y Facebook Blueprint.',
            url_picture='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
        )
        team3 = Team.objects.create(
            name='Camila Vargas',
            role='Analista SEO Senior',
            bio='Ingeniera informática especializada en posicionamiento web. Ha liderado proyectos SEO para más de 150 sitios web en toda Latinoamérica.',
            url_picture='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
        )
        team4 = Team.objects.create(
            name='Santiago Paredes',
            role='Ingeniero de Software',
            bio='Desarrollador full-stack con experiencia en React, Django y AWS. Apasionado por crear aplicaciones web escalables y de alto rendimiento.',
            url_picture='https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
        )

        blogpost1 = BlogPost.objects.create(
            title='Guía Completa de Marketing Digital para Pymes',
            content='Las pequeñas y medianas empresas tienen un enorme potencial en el mundo digital. En esta guía te explicamos paso a paso cómo crear una estrategia de marketing digital efectiva con presupuestos ajustados. Desde la elección de plataformas hasta la medición de resultados, cubrimos todos los aspectos fundamentales para que tu negocio despegue en internet.',
            author=admin_user,
            date_published=timezone.now().date(),
            category='Marketing'
        )
        blogpost2 = BlogPost.objects.create(
            title='Tendencias de Diseño Web para el 2025',
            content='El diseño web sigue evolucionando a pasos agigantados. Este año las tendencias incluyen el uso de tipografías expresivas, animaciones sutiles, modo oscuro por defecto y experiencias hiperpersonalizadas. Descubre cómo aplicar estas tendencias para mantener tu sitio web moderno y competitivo.',
            author=admin_user,
            date_published=timezone.now().date() - timedelta(days=7),
            category='Diseño'
        )
        blogpost3 = BlogPost.objects.create(
            title='SEO Local: Cómo Atraer Clientes de tu Zona',
            content='El SEO local es fundamental para negocios con presencia física. Aprende a optimizar tu ficha de Google My Business, conseguir reseñas positivas, crear contenido geolocalizado y aparecer en los resultados de búsqueda locales. Estrategias probadas para aumentar el tráfico de clientes cercanos.',
            author=client_user,
            date_published=timezone.now().date() - timedelta(days=14),
            category='SEO'
        )
        blogpost4 = BlogPost.objects.create(
            title='Automatización del Marketing: Ahorra Tiempo y Recursos',
            content='La automatización del marketing permite a las empresas escalar sus esfuerzos sin multiplicar los recursos. Descubre las mejores herramientas para automatizar correos electrónicos, publicaciones en redes sociales, segmentación de audiencias y análisis de campañas. Incluye casos de éxito y recomendaciones prácticas.',
            author=admin_user,
            date_published=timezone.now().date() - timedelta(days=25),
            category='Marketing'
        )

        testimonial1 = UserTestimonial.objects.create(
            client=client1,
            text='El equipo de Oasis Promotions superó todas nuestras expectativas. Nuestra tienda online quedó espectacular y las ventas aumentaron un 300% en el primer trimestre. Sin duda, la mejor inversión que hemos hecho.',
            date=timezone.now().date(),
            project=project1
        )
        testimonial2 = UserTestimonial.objects.create(
            client=client2,
            text='El rebranding transformó por completo la percepción de nuestra marca. Los clientes nos felicitan constantemente por nuestra nueva imagen. Muy agradecidos con todo el equipo creativo.',
            date=timezone.now().date() - timedelta(days=15),
            project=project2
        )
        testimonial3 = UserTestimonial.objects.create(
            client=client3,
            text='Pasamos de la página 10 al top 3 en Google gracias a la estrategia SEO de Oasis. El tráfico orgánico se multiplicó por cinco y ahora recibimos consultas de pacientes de toda España.',
            date=timezone.now().date() - timedelta(days=8),
            project=project3
        )

        contact1 = Contact.objects.create(
            name='Hugo Domínguez',
            email='hugo@empresa.com',
            message='Hola, soy el gerente de una cadena de restaurantes y estamos interesados en desarrollar una aplicación web para pedidos online. ¿Podrían darme una cotización?',
            date=timezone.now().date()
        )
        contact2 = Contact.objects.create(
            name='Daniela Paredes',
            email='daniela@agencia.com',
            message='Buenos días, me gustaría contratar sus servicios de community management para nuestra agencia de viajes. Necesitamos presencia activa en Instagram y TikTok.',
            date=timezone.now().date() - timedelta(days=3)
        )

        campaign1 = Campaign.objects.create(
            client=client1,
            service=service1,
            start_date=timezone.now().date(),
            end_date=timezone.now().date() + timedelta(days=45),
            metrics={'impressions': 250000, 'clicks': 12000, 'conversions': 580}
        )
        campaign2 = Campaign.objects.create(
            client=client2,
            service=service3,
            start_date=timezone.now().date() - timedelta(days=15),
            end_date=timezone.now().date() + timedelta(days=15),
            metrics={'impressions': 120000, 'clicks': 5400, 'conversions': 290}
        )
        campaign3 = Campaign.objects.create(
            client=client3,
            service=service4,
            start_date=timezone.now().date() - timedelta(days=90),
            end_date=timezone.now().date() + timedelta(days=60),
            metrics={'impressions': 350000, 'clicks': 18500, 'conversions': 920}
        )

        subscriber1 = Subscriber.objects.create(
            email='usuario1@correo.com',
            date=timezone.now().date()
        )
        subscriber2 = Subscriber.objects.create(
            email='usuario2@correo.com',
            date=timezone.now().date() - timedelta(days=7)
        )
        subscriber3 = Subscriber.objects.create(
            email='usuario3@correo.com',
            date=timezone.now().date() - timedelta(days=14)
        )
        subscriber4 = Subscriber.objects.create(
            email='usuario4@correo.com',
            date=timezone.now().date() - timedelta(days=21)
        )

        self.stdout.write(self.style.SUCCESS('¡Datos de prueba creados exitosamente!'))
