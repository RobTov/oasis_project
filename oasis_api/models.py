from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = [
        ('administrator', 'Administrator'),
        ('client', 'Client'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.username

    class Meta:
        db_table = 'users'


class Client(models.Model):
    name = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=50)
    sector = models.CharField(max_length=100)

    class Meta:
        db_table = 'clients'


class Service(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)

    class Meta:
        db_table = 'services'


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='projects')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='projects')

    class Meta:
        db_table = 'projects'


class Team(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=100)
    bio = models.TextField()
    url_picture = models.URLField(max_length=500, blank=True, null=True)

    class Meta:
        db_table = 'team'


class BlogPost(models.Model):
    title = models.CharField(max_length=300)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    date_published = models.DateField()
    category = models.CharField(max_length=100)

    class Meta:
        db_table = 'blog_posts'


class UserTestimonial(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='testimonials')
    text = models.TextField()
    date = models.DateField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='testimonials')

    class Meta:
        db_table = 'user_testimonials'


class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    date = models.DateField()

    class Meta:
        db_table = 'contacts'


class Campaign(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='campaigns')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='campaigns')
    start_date = models.DateField()
    end_date = models.DateField()
    metrics = models.JSONField(blank=True, null=True)

    class Meta:
        db_table = 'campaigns'


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    date = models.DateField()

    class Meta:
        db_table = 'subscribers'