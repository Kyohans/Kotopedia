# Generated by Django 3.2.5 on 2021-07-20 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kotopedia', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='kotodummy',
            old_name='stage',
            new_name='stagetype',
        ),
        migrations.RemoveField(
            model_name='kotodummy',
            name='rarity',
        ),
        migrations.AddField(
            model_name='kotodummy',
            name='raritytype',
            field=models.CharField(blank=True, choices=[('Rare', 'RARE'), ('Very Rare', 'VERY RARE'), ('Super Rare', 'SUPER RARE'), ('Ultra Rare', 'ULTRA RARE')], max_length=20),
        ),
    ]
