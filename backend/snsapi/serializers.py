from rest_framework import serializers
from .models import Post, Connection
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class PostSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter())
    like = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(), many=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'content',
            'user',
            'like',
            'created_at',
            'username')


class ConnectionSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter())
    following = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(), many=True)

    class Meta:
        model = Connection
        fields = ('user', 'following')
