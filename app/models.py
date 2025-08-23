
from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.urls import reverse


class Rocket(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    name = models.CharField(max_length=128,)
    description = models.CharField(max_length=128, default='description')
    status = models.CharField(max_length=128,)

