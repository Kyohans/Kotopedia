from typing import Optional

from django.test import TestCase
from django.db.utils import IntegrityError

from kotopedia.models import *

def create_word(text: str, stage = Optional[StageType]) -> Word:
  return Word(1, word = text, stage_type = stage)

class WordModelTest(TestCase):

  def test_create_word_with_no_stage(self):
    w = create_word('test')

    self.assertEqual(w.id, 1)
  
  def test_add_kotodummy_to_word_password_list(self):
    w = create_word('Alien')
    w.save()

    k = Kotodummy(1, 'Alienette', '', StageType.GRADUATED)
    k.save()

    w.kotodummy = k
    
    self.assertEqual('Alienette', w.kotodummy.name)
  
  def test_add_personalities_to_word(self):
    w = create_word('Fireworks')
    w.save()

    w.personality_set.create(personality = PersonalityType.CHEERFUL)
    w.personality_set.create(personality = PersonalityType.CUTE)

    self.assertEqual(2, w.personality_set.count())

  def test_adding_more_than_three_personalities_to_word_fails(self):
    w = create_word('Test')
    w.save()

    w.personality_set.create(personality = PersonalityType.CHEERFUL)
    w.personality_set.create(personality = PersonalityType.CUTE)
    w.personality_set.create(personality = PersonalityType.SERIOUS)
    w.personality_set.create(personality = PersonalityType.COOL)

    self.assertRaises(TooManyPersonalitiesError, w.save)
  
  def test_saving_word_with_exactly_three_personalities(self):
    w = create_word('Test')
    w.save()

    w.personality_set.create(personality = PersonalityType.CHEERFUL)
    w.personality_set.create(personality = PersonalityType.CUTE)
    w.personality_set.create(personality = PersonalityType.SERIOUS)
    w.save()

    self.assertEqual(3, w.personality_set.count())