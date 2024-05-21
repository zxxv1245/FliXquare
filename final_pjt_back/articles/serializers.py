from rest_framework import serializers
from .models import Article,Comment,Category
from django.contrib.auth import get_user_model

class ArticleListSerializer(serializers.ModelSerializer):
    class CategoryListSerializer(serializers.ModelSerializer) :
        class Meta :
            model = Category
            fields = '__all__'
    class UserDataSerializer(serializers.ModelSerializer) :
        class Meta :
            model = get_user_model()
            fields = '__all__'
            
    user = UserDataSerializer()        
    category = CategoryListSerializer()
    class Meta:
        model = Article
        fields = ('id', 'title', 'content','category','created_at','user')



class ArticleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user',)

class ArticleSerializer(serializers.ModelSerializer):
    class CategoryListSerializer(serializers.ModelSerializer) :
        class Meta :
            model = Category
            fields = '__all__'
    
    class UserDataSerializer(serializers.ModelSerializer) :
        class Meta :
            model = get_user_model()
            fields = '__all__'
            
    user = UserDataSerializer(read_only = True)  
    
    category = CategoryListSerializer()
    
    class Meta:
        model = Article
        fields = '__all__'



class CommentSerializer(serializers.ModelSerializer):
    class ArticleTitleSerializer(serializers.ModelSerializer):
        class Meta:
            model = Article
            fields = ('title',)

    class UserDataSerializer(serializers.ModelSerializer) :
        class Meta :
            model = get_user_model()
            fields = '__all__'
            
    user = UserDataSerializer(read_only = True)  
    article = ArticleTitleSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'
        # read_only_fields = ('article','user')

class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article','user')








class CategorySerializer(serializers.ModelSerializer) :
    class Meta :
        model = Category
        fields = '__all__'