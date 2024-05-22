from django.urls import path
from . import views


urlpatterns = [
    path('movies/', views.movie_list),
    path('genres/', views.genre_list),
    path('addgenre/<int:user_pk>/', views.add_genre),
    path('removegenre/<int:user_pk>/', views.remove_genre),
    path('getusergenre/<int:user_pk>/', views.get_usergenre),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('movies/<int:movie_pk>/comments/', views.comment_create),
    path('movie/<int:movie_pk>/likes/', views.likes_movie),
    path('movie/<int:movie_pk>/store/', views.store_user),
    path('comment/<int:comment_pk>/likes/', views.likes_comment),
]