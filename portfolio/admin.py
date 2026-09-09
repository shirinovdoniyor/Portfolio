from django.contrib import admin
from .models import Article, Review

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "language", "published", "created_at"]
    list_filter = ["published", "language"]
    search_fields = ["title", "body"]

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["author", "rating", "visible", "created_at"]
    list_filter = ["visible", "rating"]
    search_fields = ["body", "author__username"]
    readonly_fields = ["created_at"]
