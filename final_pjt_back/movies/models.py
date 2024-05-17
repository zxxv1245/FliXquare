from django.db import models


# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length = 16)

class Movie(models.Model):
    title = models.CharField(max_length = 50)
    overview = models.TextField()
    genre_ids = models.ManyToManyField(Genre, related_name='movies')
    poster_path = models.CharField(max_length = 200)
    popularity = models.FloatField()
    adult = models.BooleanField()
    release_date = models.DateField()
    is_latest = models.BooleanField()
    is_popular = models.BooleanField()