from rest_framework import serializers
from .models import Word, Kotodummy

class KotodummySerializer(serializers.ModelSerializer):
  class Meta:
    model = Kotodummy
    fields = (
      'no',
      'name',
      'description',
      'personality',
      'stage',
      'rarity',
      'image',
    )

class WordSerializer(serializers.ModelSerializer):
  class Meta:
    model = Word
    fields = (
      'word',
      'personality',
      'password',
    )