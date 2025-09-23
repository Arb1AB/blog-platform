from django.contrib import admin
from .models import Post, Tag, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at", "upvotes", "views", "is_draft")
    search_fields = ("title", "author__username", "content")
    list_filter = ("created_at", "is_draft", "tags")
    ordering = ("-created_at",)
    filter_horizontal = ("tags",)  # makes tags easier to manage


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("author", "post", "created_at", "upvotes")
    search_fields = ("content", "author__username", "post__title")
    list_filter = ("created_at",)
