from django.urls import path
from .views import *

urlpatterns = [
    path('', Index_view.as_view(), name='urlname_home'),
    path('editPost/<int:pk>/', EditPost_view.as_view()),
    path('posts/', Posts_view.as_view()),
    path('showPost/<int:pk>/', ContentPost_view.as_view(), name='urln_showPost'),

    path('editPost/<int:pk>/send/', save_edition),
]
