from rest_framework import status, generics, viewsets, permissions, views
from rest_framework.response import Response
from .serializers import UserSerializer, PostSerializer, ConnectionSerializer
from .models import Post, Connection
from django.contrib.auth.models import User
from django.http.response import Http404


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class RequestUserRetrieveAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.queryset.filter(id=self.request.user.id)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.AllowAny,)


class ConnectionViewSet(viewsets.ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer


class UserConnectionRetrieveAPIView(generics.ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user.id)


class LikeToggleAPIView(views.APIView):

    def get(self, request, *args, **kwargs):
        try:
            related_post = Post.objects.get(pk=self.kwargs['pk'])
        except BaseException:
            raise Http404
        if self.request.user in related_post.like.all():
            related_post.like.remove(self.request.user.id)
        else:
            related_post.like.add(self.request.user.id)
        related_post.save()

        return Response(status=status.HTTP_200_OK)


class FollowToggleAPIView(views.APIView):

    def get(self, request, *args, **kwargs):
        try:
            target_user = Post.objects.get(pk=self.kwargs['pk']).user
        except BaseException:
            raise Http404
        my_connection = Connection.objects.get_or_create(
            user=self.request.user)

        if target_user in my_connection[0].following.all():
            my_connection[0].following.remove(target_user)
        else:
            my_connection[0].following.add(target_user)
        return Response(status=status.HTTP_200_OK)
