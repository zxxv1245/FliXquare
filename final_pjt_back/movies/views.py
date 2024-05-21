
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from django.shortcuts import get_object_or_404, get_list_or_404


# Class Load
from .models import Movie,Genre,Comment
from .serializers import MovieListSerializer,GenreListSerializer,CommentCreateSerializer,CommentSerializer
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



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def comment_list(request):
    # 전체 댓글 조회
    # comments = Comment.objects.all()
    comments = get_list_or_404(Comment)
    # 직렬화 진행
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def comment_detail(request, comment_pk):
    # 단일 댓글 조회
    # comment = Comment.objects.get(pk=comment_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'GET':
        # 직렬화 진행
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def comment_create(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    # 사용자 입력 데이터를 받아 직렬화 진행
    serializer = CommentCreateSerializer(data=request.data)
    # 유효성 검사
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

