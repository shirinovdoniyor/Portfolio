from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class Review(models.Model):
    author = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = models.CharField(max_length=120, blank=True)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    body = models.TextField(max_length=2000)
    visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["-created_at"]
    def __str__(self):
        return f"{self.author.username}: {self.rating}/5"

class Article(models.Model):
    title = models.CharField(max_length=200)
    language = models.CharField(max_length=2, choices=[("uz","O‘zbek"),("ru","Русский"),("en","English")], default="uz")
    body = models.TextField()
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["-created_at"]
    def __str__(self):
        return self.title
