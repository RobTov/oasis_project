from django.core.management.base import BaseCommand
from oasis_api.models import User, Client, Service, Project, Team, BlogPost, UserTestimonial, Contact, Campaign, Subscriber
from django.utils import timezone
from datetime import timedelta


class Command(BaseCommand):
    help = 'Populate the database with seed data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating seed data...')

        admin_user = User.objects.create_user(
            username='admin',
            first_name='Admin',
            last_name='User',
            email='admin@oasis.com',
            password='admin123',
            role='administrator'
        )
        client_user = User.objects.create_user(
            username='jsmith',
            first_name='John',
            last_name='Smith',
            email='john@client.com',
            password='client123',
            role='client'
        )

        client1 = Client.objects.create(
            name='Jane Doe',
            company='TechCorp Inc.',
            email='jane@techcorp.com',
            phone='+1-555-0101',
            sector='Technology'
        )
        client2 = Client.objects.create(
            name='Bob Wilson',
            company='Fashionista Ltd.',
            email='bob@fashionista.com',
            phone='+1-555-0102',
            sector='Fashion'
        )
        client3 = Client.objects.create(
            name='Alice Brown',
            company='HealthPlus',
            email='alice@healthplus.com',
            phone='+1-555-0103',
            sector='Healthcare'
        )

        service1 = Service.objects.create(
            name='Digital Marketing',
            description='Complete digital marketing solutions for businesses',
            price=1500.00,
            category='Marketing'
        )
        service2 = Service.objects.create(
            name='Brand Identity',
            description='Professional brand identity design',
            price=2500.00,
            category='Design'
        )
        service3 = Service.objects.create(
            name='Social Media Management',
            description='Full social media account management',
            price=800.00,
            category='Social Media'
        )
        service4 = Service.objects.create(
            name='SEO Optimization',
            description='Search engine optimization services',
            price=1200.00,
            category='SEO'
        )

        project1 = Project.objects.create(
            title='TechCorp Website Redesign',
            description='Complete redesign of corporate website',
            date=timezone.now().date(),
            client=client1,
            service=service1
        )
        project2 = Project.objects.create(
            title='Fashionista Brand Campaign',
            description='Spring collection marketing campaign',
            date=timezone.now().date() - timedelta(days=30),
            client=client2,
            service=service2
        )
        project3 = Project.objects.create(
            title='HealthPlus SEO',
            description='SEO optimization for healthcare website',
            date=timezone.now().date() - timedelta(days=15),
            client=client3,
            service=service4
        )

        team1 = Team.objects.create(
            name='Sarah Johnson',
            role='Creative Director',
            bio='10+ years experience in creative design',
            url_picture='https://example.com/sarah.jpg'
        )
        team2 = Team.objects.create(
            name='Mike Chen',
            role='Marketing Lead',
            bio='Expert in digital marketing strategies',
            url_picture='https://example.com/mike.jpg'
        )
        team3 = Team.objects.create(
            name='Emily Davis',
            role='SEO Specialist',
            bio='Certified SEO expert',
            url_picture='https://example.com/emily.jpg'
        )

        blogpost1 = BlogPost.objects.create(
            title='10 Tips for Better Digital Marketing',
            content='In this post, we explore ten essential tips for improving your digital marketing efforts...',
            author=admin_user,
            date_published=timezone.now().date(),
            category='Marketing'
        )
        blogpost2 = BlogPost.objects.create(
            title='The Future of Brand Identity',
            content='Brand identity is evolving. Learn how to stay ahead of the curve...',
            author=admin_user,
            date_published=timezone.now().date() - timedelta(days=7),
            category='Design'
        )
        blogpost3 = BlogPost.objects.create(
            title='SEO Best Practices for 2024',
            content='Search engine optimization continues to evolve. Here are the latest best practices...',
            author=client_user,
            date_published=timezone.now().date() - timedelta(days=14),
            category='SEO'
        )

        testimonial1 = UserTestimonial.objects.create(
            client=client1,
            text='Oasis Promotions transformed our digital presence!',
            date=timezone.now().date(),
            project=project1
        )
        testimonial2 = UserTestimonial.objects.create(
            client=client2,
            text='Amazing campaign results. Highly recommended!',
            date=timezone.now().date() - timedelta(days=10),
            project=project2
        )

        contact1 = Contact.objects.create(
            name='New Contact',
            email='new@example.com',
            message='Interested in your services',
            date=timezone.now().date()
        )
        contact2 = Contact.objects.create(
            name='Another Contact',
            email='another@example.com',
            message='Need a quote for marketing',
            date=timezone.now().date() - timedelta(days=2)
        )

        campaign1 = Campaign.objects.create(
            client=client1,
            service=service1,
            start_date=timezone.now().date(),
            end_date=timezone.now().date() + timedelta(days=30),
            metrics={'impressions': 50000, 'clicks': 1500, 'conversions': 75}
        )
        campaign2 = Campaign.objects.create(
            client=client2,
            service=service2,
            start_date=timezone.now().date() - timedelta(days=10),
            end_date=timezone.now().date() + timedelta(days=20),
            metrics={'impressions': 30000, 'clicks': 900, 'conversions': 45}
        )

        subscriber1 = Subscriber.objects.create(
            email='subscriber1@example.com',
            date=timezone.now().date()
        )
        subscriber2 = Subscriber.objects.create(
            email='subscriber2@example.com',
            date=timezone.now().date() - timedelta(days=5)
        )
        subscriber3 = Subscriber.objects.create(
            email='subscriber3@example.com',
            date=timezone.now().date() - timedelta(days=10)
        )

        self.stdout.write(self.style.SUCCESS('Seed data created successfully!'))