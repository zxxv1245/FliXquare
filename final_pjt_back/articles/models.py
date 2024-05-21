from django.db import models
from django.conf import settings

class Category(models.Model) :
    name = models.CharField(max_length=16)

    def __str__(self) :
        return self.name

class Article(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name= 'user_article')
    category = models.ForeignKey(
        Category, on_delete = models.CASCADE,
        related_name= 'category_article')
    title = models.CharField(max_length=40)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
    related_name='user_article_comment')
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField()
    
# 나중에 할래...
# likes_user = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='like_article')