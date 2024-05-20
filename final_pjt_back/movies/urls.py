from django.urls import path
from . import views


urlpatterns = [
    path('movies/', views.movie_list),
    path('genres/', views.genre_list),
    path('addgenre/<int:user_pk>/', views.add_genre),
    path('removegenre/<int:user_pk>/', views.remove_genre),
    path('getusergenre/<int:user_pk>/', views.get_usergenre)
]