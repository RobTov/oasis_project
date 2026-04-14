from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from oasis_api.models import User, Client, Service, Project, Team, BlogPost, UserTestimonial, Contact, Campaign, Subscriber
from django.utils import timezone
from datetime import timedelta


class UserAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'username': 'testuser',
            'name': 'Test User',
            'email': 'test@example.com',
            'password': 'testpass123'
        }

    def test_create_user(self):
        response = self.client.post('/api/users/', self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

    def test_list_users(self):
        User.objects.create_user(**self.user_data)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class ClientAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.client_data = {
            'name': 'Test Client',
            'company': 'Test Company',
            'email': 'client@test.com',
            'phone': '+1-555-0100',
            'sector': 'Technology'
        }

    def test_create_client(self):
        response = self.client.post('/api/clients/', self.client_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Client.objects.count(), 1)

    def test_list_clients(self):
        Client.objects.create(**self.client_data)
        response = self.client.get('/api/clients/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class ServiceAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.service_data = {
            'name': 'Test Service',
            'description': 'Test description',
            'price': '1000.00',
            'category': 'Marketing'
        }

    def test_create_service(self):
        response = self.client.post('/api/services/', self.service_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Service.objects.count(), 1)

    def test_list_services(self):
        Service.objects.create(**self.service_data)
        response = self.client.get('/api/services/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class ProjectAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.test_client = Client.objects.create(
            name='Test Client',
            company='Test Company',
            email='test@company.com',
            phone='+1-555-0100',
            sector='Technology'
        )
        self.test_service = Service.objects.create(
            name='Test Service',
            description='Test description',
            price=1000.00,
            category='Marketing'
        )
        self.project_data = {
            'title': 'Test Project',
            'description': 'Test project description',
            'date': str(timezone.now().date()),
            'client': self.test_client.id,
            'service': self.test_service.id
        }

    def test_create_project(self):
        response = self.client.post('/api/projects/', self.project_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 1)

    def test_list_projects(self):
        Project.objects.create(
            title='Test Project',
            description='Test description',
            date=timezone.now().date(),
            client=self.test_client,
            service=self.test_service
        )
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class BlogPostAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.test_user = User.objects.create_user(
            username='author',
            name='Author',
            email='author@test.com',
            password='test123'
        )
        self.blog_data = {
            'title': 'Test Post',
            'content': 'Test content',
            'author': self.test_user.id,
            'date_published': str(timezone.now().date()),
            'category': 'Technology'
        }

    def test_create_blog_post(self):
        response = self.client.post('/api/blog-posts/', self.blog_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(BlogPost.objects.count(), 1)


class CampaignAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.test_client = Client.objects.create(
            name='Test Client',
            company='Test Company',
            email='test@company.com',
            phone='+1-555-0100',
            sector='Technology'
        )
        self.test_service = Service.objects.create(
            name='Test Service',
            description='Test description',
            price=1000.00,
            category='Marketing'
        )
        self.campaign_data = {
            'client': self.test_client.id,
            'service': self.test_service.id,
            'start_date': str(timezone.now().date()),
            'end_date': str(timezone.now().date() + timedelta(days=30)),
            'metrics': {'impressions': 1000, 'clicks': 100}
        }

    def test_create_campaign(self):
        response = self.client.post('/api/campaigns/', self.campaign_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Campaign.objects.count(), 1)


class SubscriberAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.subscriber_data = {
            'email': 'subscribe@test.com',
            'date': str(timezone.now().date())
        }

    def test_create_subscriber(self):
        response = self.client.post('/api/subscribers/', self.subscriber_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Subscriber.objects.count(), 1)


class TeamAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.team_data = {
            'name': 'Test Member',
            'role': 'Developer',
            'bio': 'Test bio',
            'url_picture': 'https://example.com/test.jpg'
        }

    def test_create_team_member(self):
        response = self.client.post('/api/team/', self.team_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.count(), 1)


class ContactAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.contact_data = {
            'name': 'Test Contact',
            'email': 'contact@test.com',
            'message': 'Test message',
            'date': str(timezone.now().date())
        }

    def test_create_contact(self):
        response = self.client.post('/api/contacts/', self.contact_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contact.objects.count(), 1)


class UserTestimonialAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.test_client = Client.objects.create(
            name='Test Client',
            company='Test Company',
            email='test@company.com',
            phone='+1-555-0100',
            sector='Technology'
        )
        self.test_service = Service.objects.create(
            name='Test Service',
            description='Test description',
            price=1000.00,
            category='Marketing'
        )
        self.test_project = Project.objects.create(
            title='Test Project',
            description='Test description',
            date=timezone.now().date(),
            client=self.test_client,
            service=self.test_service
        )
        self.testimonial_data = {
            'client': self.test_client.id,
            'text': 'Great service!',
            'date': str(timezone.now().date()),
            'project': self.test_project.id
        }

    def test_create_testimonial(self):
        response = self.client.post('/api/testimonials/', self.testimonial_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserTestimonial.objects.count(), 1)