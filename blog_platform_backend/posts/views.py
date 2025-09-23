from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "slug"
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post_slug = self.kwargs.get("slug")
        post = get_object_or_404(Post, slug=post_slug)
        serializer.save(author=self.request.user, post=post)


class PostUpvoteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post.upvote(user=request.user)
        return Response({"upvotes": post.upvotes})


class CommentUpvoteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        comment = get_object_or_404(Comment, pk=pk)
        comment.upvote(user=request.user)
        return Response({"upvotes": comment.upvotes})


class AnalyticsOverviewView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        total_posts = Post.objects.count()
        total_comments = Comment.objects.count()
        total_views = Post.objects.aggregate(views=Sum("views"))["views"] or 0

        # Top users by reputation (from Profile model in accounts)
        from accounts.models import Profile
        top_users = Profile.objects.order_by("-reputation")[:5]
        top_users_data = [
            {"username": u.user.username, "reputation": u.reputation}
            for u in top_users
        ]

        return Response({
            "total_posts": total_posts,
            "total_comments": total_comments,
            "total_views": total_views,
            "top_users": top_users_data,
        })
