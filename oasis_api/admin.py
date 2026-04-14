from django.contrib import admin
from .models import (
    User, Client, Service, Project, Team, BlogPost,
    UserTestimonial, Contact, Campaign, Subscriber
)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'role']

admin.site.register(Client)
admin.site.register(Service)
admin.site.register(Project)
admin.site.register(Team)
admin.site.register(BlogPost)
admin.site.register(UserTestimonial)
admin.site.register(Contact)
admin.site.register(Campaign)
admin.site.register(Subscriber)