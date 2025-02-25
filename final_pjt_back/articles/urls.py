from django.urls import path
from . import views


urlpatterns = [
    path('articles/', views.article_list),
    path('articles/<int:article_pk>/', views.article_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('articles/<int:article_pk>/comments/', views.comment_create),
    path('category/', views.catagory_list),
    path('article/<int:article_pk>/likes/', views.likes_article,),
    path('comment/<int:comment_pk>/likes/', views.likes_comment,),
]
