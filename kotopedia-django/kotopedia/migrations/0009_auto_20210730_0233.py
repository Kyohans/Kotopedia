# Generated by Django 3.2.5 on 2021-07-30 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kotopedia', '0008_kotodummy_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kotodummy',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.RemoveField(
            model_name='kotodummy',
            name='password',
        ),
        migrations.AddField(
            model_name='kotodummy',
            name='password',
            field=models.ManyToManyField(blank=True, null=True, to='kotopedia.Word'),
        ),
    ]
