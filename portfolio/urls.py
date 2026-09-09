from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path("", views.index),
    path("admin/", admin.site.urls),
    path("api/session/", views.session),
    path("api/register/", views.register),
    path("api/login/", views.sign_in),
    path("api/logout/", views.sign_out),
    path("api/profile/", views.profile),
    path("api/password/", views.password),
    path("api/reviews/", views.reviews),
    path("api/articles/", views.articles),
] + static("/assets/", document_root=settings.BASE_DIR / "assets")
