from django.test import TestCase

from kotopedia.models import Kotodummy

def create_kotodummy(no, name, description, stage):
  return Kotodummy.objects.create(no, name, description, stage)


