from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, RequestUserRetrieveAPIView, PostViewSet, ConnectionViewSet, LikeToggleAPIView, FollowToggleAPIView, UserConnectionRetrieveAPIView

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('posts', PostViewSet)
router.register('connections', ConnectionViewSet)

urlpatterns = [
    path(
        '',
        include(
            router.urls)),
    path(
        'request-user/',
        RequestUserRetrieveAPIView.as_view(),
        name="request_user_api"),
    path(
        'request-user/connections/',
        UserConnectionRetrieveAPIView.as_view(),
        name="request_user_follow_api"),
    path(
        'like/<int:pk>/',
        LikeToggleAPIView.as_view(),
        name="toggle_post_like_api"),
    path(
        'follow/<int:pk>/',
        FollowToggleAPIView.as_view(),
        name="toggle_user_follow_api"),
]
