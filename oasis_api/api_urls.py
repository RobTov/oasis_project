from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    ClientViewSet, ServiceViewSet, ProjectViewSet,
    TeamViewSet, BlogPostViewSet, UserTestimonialViewSet,
    ContactViewSet, CampaignViewSet, SubscriberViewSet
)

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'team', TeamViewSet)
router.register(r'blog-posts', BlogPostViewSet)
router.register(r'testimonials', UserTestimonialViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'campaigns', CampaignViewSet)
router.register(r'subscribers', SubscriberViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]