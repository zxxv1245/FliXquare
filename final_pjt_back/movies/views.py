
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from django.shortcuts import get_object_or_404, get_list_or_404


# Class Load
from .models import Movie,Genre
from .serializers import MovieListSerializer,GenreListSerializer
from django.contrib.auth import get_user_model
# Create your views here.
@api_view(['GET'])
def movie_list(request) :
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializer(movies, many = True)
    return Response(serializer.data)


@api_view(['GET'])
def genre_list(request) :
    genres = get_list_or_404(Genre)
    serializer = GenreListSerializer(genres, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def add_genre(request,user_pk) :
    # print(request.GET['genre[0][id]'])
    
    User = get_user_model()
    for i in range(3) :
        genre_id = request.GET[f'genre[{i}][id]']
        genre = Genre.objects.get(pk = genre_id)
        if user_pk not in genre.user.all() :
            genre.user.add(user_pk)
    
    return Response('성공!')


@api_view(['GET'])
def remove_genre(request, user_pk) :
    User = get_user_model()
    person = User.objects.get(pk = user_pk)
    
    genres = Genre.objects.all()
    
    for genre in genres:
        if person in genre.user.all():
            genre.user.remove(person)
    return Response('성공!!!')


@api_view(['GET'])
def get_usergenre(request, user_pk) :
    User = get_user_model()
    person = User.objects.get(pk = user_pk)
    genres = Genre.objects.filter(user=person)
    serializer = GenreListSerializer(genres, many = True)
    return Response(serializer.data)