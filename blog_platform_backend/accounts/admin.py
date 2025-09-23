from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at", "upvotes")
    search_fields = ("title", "author__username", "content")
    list_filter = ("created_at", "tags")
    ordering = ("-created_at",)
