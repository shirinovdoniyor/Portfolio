import json
import re
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import IntegrityError
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.views.decorators.http import require_http_methods, require_GET, require_POST
from .models import Review, Article

def index(request):
    return render(request, "index.html")

def failure(code, status=400):
    return JsonResponse({"error":code}, status=status)

def payload(request):
    try:
        result = json.loads(request.body)
        return result if isinstance(result, dict) else {}
    except (ValueError, UnicodeDecodeError):
        return {}

def user_data(user):
    if not user.is_authenticated:
        return None
    return {"username":user.username, "name":user.first_name, "email":user.email, "staff":user.is_staff}

@require_GET
def session(request):
    return JsonResponse({"user":user_data(request.user), "csrf":get_token(request)})

@require_POST
def register(request):
    data = payload(request)
    if not all(isinstance(data.get(k), str) for k in ["username","password","name","email"]):
        return failure("invalid")
    if not data["name"].strip() or len(data["name"]) > 150:
        return failure("invalid")
    try:
        validate_email(data["email"])
    except ValidationError:
        return failure("invalid")
    if User.objects.filter(email__iexact=data["email"].strip()).exists():
        return failure("registration")
    form = UserCreationForm({"username":data["username"], "password1":data["password"], "password2":data["password"]})
    if not form.is_valid():
        return failure("registration")
    try:
        user = form.save(commit=False)
        user.first_name = data["name"].strip()
        user.email = data["email"]
        user.save()
    except IntegrityError:
        return failure("registration")
    login(request, user)
    return JsonResponse({"user":user_data(user), "csrf":get_token(request)}, status=201)

@require_POST
def sign_in(request):
    data = payload(request)
    if not isinstance(data.get("password"), str) or not isinstance(data.get("identifier", data.get("username")), str):
        return failure("invalid")
    identifier = data.get("identifier", data.get("username")).strip()
    user = authenticate(request, username=identifier, password=data["password"])
    if user is None and "@" in identifier:
        email_user = User.objects.filter(email__iexact=identifier).first()
        if email_user:
            user = authenticate(request, username=email_user.username, password=data["password"])
        elif len(data["password"]) >= 8:
            base = re.sub(r"[^a-zA-Z0-9_]", "", identifier.split("@", 1)[0]) or "user"
            username = base
            suffix = 1
            while User.objects.filter(username=username).exists():
                suffix += 1
                username = f"{base}{suffix}"
            user = User.objects.create_user(username=username, email=identifier, first_name=identifier.split("@", 1)[0], password=data["password"])
    if user is None:
        return failure("credentials", 401)
    login(request, user)
    return JsonResponse({"user":user_data(user), "csrf":get_token(request)})

@require_POST
def sign_out(request):
    logout(request)
    return JsonResponse({"user":None, "csrf":get_token(request)})

@require_POST
def profile(request):
    if not request.user.is_authenticated:
        return failure("login", 401)
    data = payload(request)
    if not isinstance(data.get("name"),str) or not data["name"].strip() or len(data["name"]) > 150:
        return failure("invalid")
    try:
        validate_email(data.get("email", ""))
    except (ValidationError, TypeError):
        return failure("invalid")
    request.user.first_name = data["name"].strip()
    request.user.email = data["email"]
    request.user.save(update_fields=["first_name","email"])
    return JsonResponse({"user":user_data(request.user)})

@require_POST
def password(request):
    if not request.user.is_authenticated:
        return failure("login", 401)
    data = payload(request)
    if not all(isinstance(data.get(k), str) for k in ["old_password","new_password1","new_password2"]):
        return failure("invalid")
    form = PasswordChangeForm(request.user, data)
    if not form.is_valid():
        return failure("password")
    user = form.save()
    update_session_auth_hash(request, user)
    return JsonResponse({"ok":True})

@require_http_methods(["GET","POST"])
def reviews(request):
    if request.method == "POST":
        if not request.user.is_authenticated:
            return failure("login", 401)
        data = payload(request)
        if not isinstance(data.get("body"),str) or not 1 <= len(data["body"].strip()) <= 2000:
            return failure("invalid")
        if type(data.get("rating")) is not int or not 1 <= data["rating"] <= 5:
            return failure("invalid")
        if not isinstance(data.get("location",""),str) or len(data.get("location","")) > 120:
            return failure("invalid")
        if Review.objects.filter(author=request.user).exists():
            return failure("duplicate")
        try:
            Review.objects.create(author=request.user, body=data["body"].strip(), rating=data["rating"], location=data.get("location","").strip())
        except IntegrityError:
            return failure("duplicate")
        return JsonResponse({"ok":True}, status=201)
    items = Review.objects.filter(visible=True).select_related("author")[:100]
    return JsonResponse({"items":[{"id":r.id, "name":r.author.first_name or r.author.username, "location":r.location, "rating":r.rating, "body":r.body, "date":r.created_at.isoformat()} for r in items], "has_review":request.user.is_authenticated and Review.objects.filter(author=request.user).exists()})

@require_GET
def articles(request):
    items = Article.objects.filter(published=True)
    language = request.GET.get("lang", "uz")
    items = items.filter(language=language if language in ("uz","ru","en") else "uz")
    query = request.GET.get("q","")[:200]
    if query:
        items = items.filter(title__icontains=query)
    return JsonResponse({"items":[{"id":a.id, "title":a.title, "body":a.body, "date":a.created_at.isoformat()} for a in items[:100]]})
