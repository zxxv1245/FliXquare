from rest_framework import serializers
from .models import Movie,Genre,Comment
from django.contrib.auth import get_user_model

class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"
        
class GenreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"
        
class CommentSerializer(serializers.ModelSerializer):
    class UserDataSerializer(serializers.ModelSerializer) :
        class Meta :
            model = get_user_model()
            fields = '__all__'
            
    user = UserDataSerializer(read_only = True)  
    
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('movie',)

class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('movie','user')
