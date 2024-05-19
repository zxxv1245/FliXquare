from django.urls import path
from . import views


urlpatterns = [
    path('movies/', views.movie_list),
    path('genres/', views.genre_list)
]