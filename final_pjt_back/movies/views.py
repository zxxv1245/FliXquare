
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

