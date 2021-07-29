from django.contrib import admin
from .models import Kotodummy, Word, Personality

class KotodummyPersonalityInLine(admin.TabularInline):
  model = Personality
  extra = 1

  exclude = ['word']

class WordPersonalityInLine(admin.TabularInline):
  model = Personality
  extra = 1

  exclude = ['kotodummy']

@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
  list_display = ('word', 'stage', 'personality', 'password')
  ordering = ['word']

  inlines = [WordPersonalityInLine]

@admin.register(Kotodummy)
class KotodummyAdmin(admin.ModelAdmin):
  list_display = ('name', 'description', 'personality', 'stage', 'rarity')
  ordering = ['no']

  inlines = [KotodummyPersonalityInLine]
