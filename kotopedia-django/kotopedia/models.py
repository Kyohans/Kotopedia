from django.db import models
from django.db.models import F, Func
from django.contrib import admin
from djchoices import ChoiceItem, DjangoChoices

class TooManyPersonalitiesError(Exception):
  def __init__(self, obj):
    self.obj = obj
    self.message = f'{obj} has too many personalities!'
    super().__init__(self.message)

class PersonalityType(DjangoChoices):
  CHEERFUL = ChoiceItem('Cheerful')
  COOL = ChoiceItem('Cool')
  CUTE = ChoiceItem('Cute')
  DARK = ChoiceItem('Dark')
  SERIOUS = ChoiceItem('Serious')

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

class Kotodummy(models.Model):
  no = models.IntegerField(primary_key = True)
  name = models.CharField(max_length = 50, unique = True)
  description = models.TextField()
  stage_type = models.CharField(max_length = 20, choices = StageType.choices)
  rarity_type = models.CharField(max_length = 20, choices = RarityType.choices, blank = True)
  image = models.ImageField(null = True, blank = True)

  def __str__(self):
    return self.name
  
  def save(self, *args, **kwargs):
    if self.personality_set.count() > 3:
      raise TooManyPersonalitiesError(self)
    else:
      super().save()
  
  @admin.display
  def personality(self):
    return ', '.join(p.personality for p in self.personality_set.all())

  @admin.display
  def stage(self):
    return self.stage_type
  
  @admin.display
  def rarity(self):
    return self.rarity_type if self.rarity_type else '-'

class Word(models.Model):
  word = models.CharField(max_length = 50)
  stage_type = models.CharField(max_length = 20, choices = StageType.choices, blank = True)
  kotodummy = models.OneToOneField(Kotodummy, on_delete = models.DO_NOTHING, null = True, blank = True)

  @admin.display
  def word_ordering(self):
    return self.word.lower()

  class Meta:
    ordering = [Func(F('word'), function = 'LOWER')]

  def __str__(self):
    return self.word

  @admin.display
  def personality(self):
    return ', '.join(p.personality for p in self.personality_set.all())

  @admin.display
  def stage(self):
    return self.stage_type if self.stage_type else '-'
  
  @admin.display
  def password(self):
    return self.kotodummy.name if self.kotodummy else ""

  def save(self, *args, **kwargs):
    if self.personality_set.count() > 6:
      raise TooManyPersonalitiesError(self)
    else:
      super().save()

class Personality(models.Model):
  personality = models.CharField(max_length = 15, choices = PersonalityType.choices)
  kotodummy = models.ForeignKey(Kotodummy, on_delete = models.CASCADE, null = True, blank = True)
  word = models.ForeignKey(Word, on_delete = models.CASCADE, null = True, blank = True)

  def __str__(self):
    return self.personality
  
