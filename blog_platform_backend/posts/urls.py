from django.urls import path
from .views import (
    PostListCreateView,
    PostDetailView,
    CommentCreateView,
    PostUpvoteView,
    CommentUpvoteView,
    AnalyticsOverviewView,
)

urlpatterns = [
    path("", PostListCreateView.as_view(), name="post-list"),
    path("<slug:slug>/", PostDetailView.as_view(), name="post-detail"),
    path("<slug:slug>/comment/", CommentCreateView.as_view(), name="comment-create"),
    path("<int:pk>/upvote/", PostUpvoteView.as_view(), name="post-upvote"),
    path("comments/<int:pk>/upvote/", CommentUpvoteView.as_view(), name="comment-upvote"),
    path("analytics/overview/", AnalyticsOverviewView.as_view(), name="analytics-overview"),
]
