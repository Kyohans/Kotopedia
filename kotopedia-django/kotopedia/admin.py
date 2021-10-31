from django.contrib import admin
from .models import Kotodummy, Word, Personality, PersonalityType

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
  search_fields = ['word']
  list_filter = ['stage_type']
  ordering = ['word']

  inlines = [WordPersonalityInLine]

@admin.register(Kotodummy)
class KotodummyAdmin(admin.ModelAdmin):
  list_display = ('name', 'description', 'personality', 'stage', 'rarity')
  ordering = ['no']
  search_fields = ['name']
  list_filter = ['stage_type']

  inlines = [KotodummyPersonalityInLine]
