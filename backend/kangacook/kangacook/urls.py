from django.contrib import admin
from django.urls import path, include
from recipes import views

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('recipes.urls')),
]
