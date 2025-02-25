# Generated by Django 4.2.8 on 2024-05-22 19:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=16)),
                ('user', models.ManyToManyField(related_name='user_gerne', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('overview', models.TextField()),
                ('poster_path', models.CharField(max_length=200)),
                ('popularity', models.FloatField()),
                ('adult', models.BooleanField()),
                ('release_date', models.DateField()),
                ('is_latest', models.BooleanField()),
                ('is_popular', models.BooleanField()),
                ('genre_ids', models.ManyToManyField(related_name='movies', to='movies.genre')),
                ('likes_user', models.ManyToManyField(blank=True, related_name='like_movie', to=settings.AUTH_USER_MODEL)),
                ('store_user', models.ManyToManyField(blank=True, related_name='store_movie', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('likes_user', models.ManyToManyField(blank=True, related_name='like_movie_comment', to=settings.AUTH_USER_MODEL)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_movie_comment', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
