from django.urls import path, include
from rest_framework import routers

from . import views

urlpatterns = [
    path('file-generator/', views.FileGeneratorToDownloadViewSet),
    
    path('user-project/', views.UserProjectViewSet),
    path('user-project/<uuid:uuid>/', views.UserProjectDetailViewSet),
    path('pdf-project-detail/<uuid:user_project_uuid>/', views.PDFProjectDetailViewSet),
]
