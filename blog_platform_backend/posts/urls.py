from django.urls import path
from django.http import JsonResponse
from .views import PostListCreateView, PostDetailView

# Root view for /api/posts/
def posts_root(request):
    return JsonResponse({
        "list_create": "/api/posts/",          # list all posts / create new post
        "detail": "/api/posts/<id>/",          # view, update, delete a post
    })

urlpatterns = [
    path("", posts_root, name="posts-root"),        # 👈 now /api/posts/ root shows JSON
    path("", PostListCreateView.as_view(), name="post-list-create"),
    path("<int:pk>/", PostDetailView.as_view(), name="post-detail"),
]
