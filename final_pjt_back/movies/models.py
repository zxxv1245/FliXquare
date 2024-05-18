from django.db import models
from django.conf import settings
# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length = 16)
    user = models.ManyToManyField(settings.AUTH_USER_MODEL,
    related_name='user_gerne')

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
    # 나중에...
    # likes_user = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='like_movie')
    
# Detail Modal에 들어갈 댓글
class Comment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
    related_name='user_movie_comment')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    content = models.TextField()
    