
from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.urls import reverse
from django.contrib.auth.models import User


class Rocket(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    name = models.CharField(max_length=128,)
    description = models.CharField(max_length=128, default='description')
    status = models.CharField(max_length=128,)

class Post(models.Model):
    # решил отказаться от механики пока что
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=128,)
    countView = models.IntegerField(default=0 ,blank=True)
    
    def __str__(self):
        return self.title

class ContentPost(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    typeContent = models.CharField(max_length=128,)
    title = models.CharField(max_length=256,)
    value = models.CharField(max_length=4096) # небольшие блоки текста
    pos = models.IntegerField()

    def __str__(self):
        return self.title