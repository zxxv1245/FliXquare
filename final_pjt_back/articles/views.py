from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404, get_list_or_404

from .serializers import ArticleListSerializer, ArticleSerializer,ArticleCreateSerializer,CommentCreateSerializer,CommentSerializer,CategorySerializer
from .models import Article, Comment, Category

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def article_list(request):
    if request.method == 'GET':
        articles = get_list_or_404(Article)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ArticleCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # serializer.save()
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def article_detail(request, article_pk):
    # article = Article.objects.get(pk=article_pk)
    article = get_object_or_404(Article, pk=article_pk)
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = ArticleSerializer(
            article, data=request.data, partial=True
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
def comment_create(request, article_pk):
    # 게시글 조회
    # article = Article.objects.get(pk=article_pk)
    article = get_object_or_404(Article, pk=article_pk)
    # 사용자 입력 데이터를 받아 직렬화 진행
    serializer = CommentCreateSerializer(data=request.data)
    # 유효성 검사
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def catagory_list(request) :
    categorys = get_list_or_404(Category)
    serializer = CategorySerializer(categorys, many=True)
    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def likes_article(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user in article.likes_user.all():
        article.likes_user.remove(request.user)
        is_liked = False
    else:
        article.likes_user.add(request.user)
        is_liked = True
    context = {
        'is_liked': is_liked,
    }
    return Response(context)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def likes_comment(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.user in comment.likes_user.all():
        comment.likes_user.remove(request.user)
        is_liked = False
    else:
        comment.likes_user.add(request.user)
        is_liked = True
    context = {
        'is_liked': is_liked,
    }
    return Response(context)