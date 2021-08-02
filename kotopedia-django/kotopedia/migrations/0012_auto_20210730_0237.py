# Generated by Django 3.2.5 on 2021-07-30 02:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('kotopedia', '0011_kotodummy_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='kotodummy',
            name='password',
        ),
        migrations.AddField(
            model_name='kotodummy',
            name='password',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='kotopedia.word'),
        ),
    ]