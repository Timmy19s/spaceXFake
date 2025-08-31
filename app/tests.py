from django.test import TestCase, Client
from app.models import *
from app.views import *


# test registrations

# Create your tests here.
class RocketTestCase(TestCase):
    def createRockets(self):
        Rocket.objects.create(name='X245', description='rocket delivery', status='under construction')
        Rocket.objects.create(name='X135', description='rocket delivery', status='in space')
        Rocket.objects.create(name='Y32', description='rocket explorer', status='in space')
    
    def test_Create(self):
        self.createRockets()
    
        self.assertEqual(Rocket.objects.get(name='X245').status, 'under construction')
    
    def test_Update(self):
        self.createRockets()

        x245 = Rocket.objects.get(name='X245')
        x245.status='ready to run'
        x245.save()

        Rocket.objects.filter(status='in space').update(status='in Sun system')


        self.assertEqual(Rocket.objects.get(name='X245').status, 'ready to run')
        self.assertEqual(Rocket.objects.get(name='Y32').status, 'in Sun system')
    
    def test_Read(self):
        self.createRockets()

        self.assertEqual(Rocket.objects.get(name='Y32').status, 'in space')
    
    def test_Delete(self):
        self.createRockets()

        Rocket.objects.get(name='X135').delete()
        self.assertEqual(len(tuple(Rocket.objects.filter(status='in space'))), 1)

class PostAndContent_TestCAse(TestCase):
    def createPosts(self):
        Post.objects.create(title='X245')
        Post.objects.create(title='X135')
        Post.objects.create(title='Y32')
    
    def fillContent(self):
        # yfg
        pass
        