from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post, Comment, Tag

User = get_user_model()

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "author", "content", "created_at", "upvotes", "parent", "replies"]

    def get_replies(self, obj):
        return CommentSerializer(obj.replies.all(), many=True).data

class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    tags = TagSerializer(many=True, required=False)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            "id", "title", "slug", "author", "content",
            "created_at", "updated_at", "tags", "is_draft",
            "views", "upvotes", "comments"
        ]

    def create(self, validated_data):
        tags_data = validated_data.pop("tags", [])
        post = Post.objects.create(**validated_data)
        for tag_data in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_data["name"])
            post.tags.add(tag)
        return post

    def update(self, instance, validated_data):
        tags_data = validated_data.pop("tags", [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if tags_data:
            instance.tags.clear()
            for tag_data in tags_data:
                tag, _ = Tag.objects.get_or_create(name=tag_data["name"])
                instance.tags.add(tag)
        return instance
