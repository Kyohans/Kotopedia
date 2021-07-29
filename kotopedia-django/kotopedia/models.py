from django.db import models
from django.contrib import admin
from djchoices import ChoiceItem, DjangoChoices
import os

class TooManyPersonalitiesError(Exception):
  def __init__(self, obj):
    self.obj = obj
    self.message = f'{obj} is not allowed to have more than three personalities!'
    super().__init__(self.message)

class PersonalityType(DjangoChoices):
  CHEERFUL = ChoiceItem('Cheerful')
  CUTE = ChoiceItem('Cute')
  DARK = ChoiceItem('Dark')
  SERIOUS = ChoiceItem('Serious')
  COOL = ChoiceItem('Cool')

class StageType(DjangoChoices):
  CHILD = ChoiceItem('Child')
  TEEN = ChoiceItem('Teen')
  PENSIONER = ChoiceItem('Pensioner')
  GRADUATED = ChoiceItem('Graduated')

class RarityType(DjangoChoices):
  RARE = ChoiceItem('Rare')
  VERY_RARE = ChoiceItem('Very Rare')
  SUPER_RARE = ChoiceItem('Super Rare')
  ULTRA_RARE = ChoiceItem('Ultra Rare')

def valid_personalities(obj):
  return True if len(obj) <= 3 else False

class Kotodummy(models.Model):
  no = models.IntegerField(primary_key = True)
  name = models.CharField(max_length = 50)
  description = models.TextField()
  stage_type = models.CharField(max_length = 20, choices = StageType.choices)
  rarity_type = models.CharField(max_length = 20, choices = RarityType.choices, blank = True)

  def __str__(self):
    return self.name
  
  @admin.display
  def personality(obj):
    return ', '.join(p.personality for p in obj.personality_set.all())

  @admin.display
  def stage(obj):
    return obj.stage_type
  
  @admin.display
  def rarity(obj):
    return obj.rarity_type

class Word(models.Model):
  word = models.CharField(max_length = 100)
  stage_type = models.CharField(max_length = 20, choices = StageType.choices, blank = True)
  password = models.ForeignKey(Kotodummy, on_delete = models.DO_NOTHING, blank = True, null = True)

  def __str__(self):
    return self.word

  @admin.display
  def personality(obj):
    return ', '.join(p.personality for p in obj.personality_set.all())

  @admin.display
  def stage(obj):
    return obj.stage_type

class Personality(models.Model):
  personality = models.CharField(max_length = 15, choices = PersonalityType.choices)
  kotodummy = models.ForeignKey(Kotodummy, on_delete = models.CASCADE, null = True, blank = True)
  word = models.ForeignKey(Word, on_delete = models.CASCADE, null = True, blank = True)

  def __str__(self):
    return self.personality
  
