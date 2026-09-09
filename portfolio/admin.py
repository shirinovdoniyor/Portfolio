from django.contrib import admin
from .models import Article, Review

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "language", "published", "created_at"]
    list_editable = ["published"]
    list_filter = ["published", "language"]

    def get_exclude(self, request, obj=None):
        return ["published"] if obj is None else []

    def save_model(self, request, obj, form, change):
        if not change:
            obj.published = True
        super().save_model(request, obj, form, change)

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name == "published":
            kwargs["help_text"] = "Saytda ko‘rinishi uchun belgilang. Belgilanmasa, maqola qoralama bo‘lib qoladi."
        elif db_field.name == "language":
            kwargs["help_text"] = "Maqola saytning faqat shu tilidagi bo‘limida ko‘rinadi."
        return super().formfield_for_dbfield(db_field, request, **kwargs)

    search_fields = ["title", "body"]

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["author", "rating", "visible", "created_at"]
    list_filter = ["visible", "rating"]
    search_fields = ["body", "author__username"]
    readonly_fields = ["created_at"]
