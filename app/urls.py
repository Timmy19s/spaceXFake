from django.urls import path
from .views import *

urlpatterns = [
    path('', Index_view.as_view(), name='urlname_home'),
]
