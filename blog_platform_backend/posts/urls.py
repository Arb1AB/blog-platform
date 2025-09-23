from django.urls import path
from .views import PostListCreateView, PostDetailView, CommentCreateView

urlpatterns = [
    path("", PostListCreateView.as_view(), name="post-list"),
    path("<slug:slug>/", PostDetailView.as_view(), name="post-detail"),
    path("<slug:slug>/comment/", CommentCreateView.as_view(), name="comment-create"),
]
