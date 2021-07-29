from typing import Optional

from django.test import TestCase
from django.db.utils import IntegrityError

from kotopedia.models import *

def create_kotodummy(no: int, name: str, description: str, stage: StageType, rarity = Optional[RarityType]) -> Kotodummy:
  return Kotodummy(no, name, description, stage, rarity)

class KotodummyModelTest(TestCase):

  def test_create_kotodummy_with_no_stage_raises_integrity_error(self):
    kotodummy = create_kotodummy(0, '', '', None)

    self.assertRaises(IntegrityError, kotodummy.save)

  def test_creating_kotodummy_with_duplicate_id_overwrites(self):
    kotodummy_one = create_kotodummy(1, 'Kotodummy', '', StageType.CHILD)
    kotodummy_one.save()

    kotodummy_one = create_kotodummy(1, 'Kotodama', '', StageType.GRADUATED)
    kotodummy_one.save()

    self.assertEqual(1, Kotodummy.objects.count())
    self.assertEqual('Kotodama', kotodummy_one.name)
  
  def test_adding_more_than_three_personalities_fails(self):
    kotodummy = create_kotodummy(1, 'Kotodummy', '', StageType.CHILD)
    kotodummy.save()

    kotodummy.personality_set.create(personality = PersonalityType.CUTE)
    kotodummy.personality_set.create(personality = PersonalityType.CHEERFUL)
    kotodummy.personality_set.create(personality = PersonalityType.DARK)

    kotodummy.personality_set.create(personality = PersonalityType.SERIOUS)

    self.assertRaises(TooManyPersonalitiesError, kotodummy.save)
