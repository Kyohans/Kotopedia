from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
from .models import *

class KotodummyView(viewsets.ModelViewSet):
  serializer_class = KotodummySerializer
  queryset = Kotodummy.objects.all()

class WordView(viewsets.ModelViewSet):
  serializer_class = WordSerializer
  queryset = Word.objects.all()
