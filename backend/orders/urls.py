from django.urls import path

from . import views

urlpatterns = [
    path('orders/', views.Orders.as_view(), name='orders'),
]
