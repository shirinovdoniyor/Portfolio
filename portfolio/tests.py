import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Article, Review

class PortfolioTests(TestCase):
    def setUp(self):
        self.client = Client(enforce_csrf_checks=True)
        self.token = self.client.get("/api/session/").json()["csrf"]
    def post(self, path, data):
        response = self.client.post("/api/"+path+"/", json.dumps(data), content_type="application/json", HTTP_X_CSRFTOKEN=self.token)
        if response.headers.get("Content-Type","").startswith("application/json") and response.json().get("csrf"):
            self.token = response.json()["csrf"]
        return response
    def register(self):
        return self.post("register", {"username":"visitor", "name":"Visitor", "email":"visitor@example.com", "password":"A-strong-portfolio-938!"})
    def test_reviews_require_login_and_are_shared(self):
        self.assertEqual(self.post("reviews", {"body":"Hello","rating":5}).status_code, 401)
        self.assertEqual(self.register().status_code, 201)
        self.assertEqual(self.post("reviews", {"body":"Great work <script>alert(1)</script>", "rating":5,"location":"Tashkent"}).status_code, 201)
        other = Client()
        item = other.get("/api/reviews/").json()["items"][0]
        self.assertEqual(item["name"],"Visitor")
        self.assertNotIn("email",item)
        self.assertEqual(self.post("reviews", {"body":"Again", "rating":5}).status_code,400)
        self.post("logout", {})
        self.assertEqual(self.post("reviews", {"body":"Hello","rating":5}).status_code,401)
        self.assertEqual(self.post("login", {"username":"visitor","password":"A-strong-portfolio-938!"}).status_code,200)
        self.assertTrue(self.client.get("/api/reviews/").json()["has_review"])
    def test_csrf_and_validation(self):
        response=self.client.post("/api/register/", "{}", content_type="application/json")
        self.assertEqual(response.status_code,403)
        self.register()
        for data in [{"body":"", "rating":5},{"body":"Hi","rating":6},{"body":"Hi","rating":True},{"body":"Hi","rating":3,"location":[]},{"body":"x"*2001,"rating":4}]:
            self.assertEqual(self.post("reviews",data).status_code,400)
        self.assertEqual(Review.objects.count(),0)
    def test_profile_and_password(self):
        self.register()
        self.assertEqual(self.post("profile", {"name":"New Name","email":"new@example.com"}).status_code,200)
        self.assertEqual(self.post("password", {"old_password":"wrong","new_password1":"Next-strong-938!","new_password2":"Next-strong-938!"}).status_code,400)
        self.assertEqual(self.post("password", {"old_password":"A-strong-portfolio-938!","new_password1":"Next-strong-938!","new_password2":"Next-strong-938!"}).status_code,200)
        self.assertEqual(self.client.get("/api/session/").json()["user"]["name"],"New Name")
        user=User.objects.get(username="visitor")
        self.assertTrue(user.check_password("Next-strong-938!"))
        self.assertNotEqual(user.password,"Next-strong-938!")
    def test_published_articles_only(self):
        Article.objects.create(title="Draft",body="Secret",published=False)
        Article.objects.create(title="Django",body="Public",published=True)
        Article.objects.create(title="English",body="Text",published=True,language="en")
        self.assertEqual([a["title"] for a in self.client.get("/api/articles/?lang=uz").json()["items"]],["Django"])
        self.assertEqual(self.client.get("/api/articles/?q=missing").json()["items"],[])
        self.assertEqual(len(self.client.get("/api/articles/?lang=en").json()["items"]),1)
        self.assertEqual(self.client.get("/admin/portfolio/article/add/").status_code,302)
    def test_hidden_reviews(self):
        self.register()
        self.post("reviews", {"body":"Review","rating":4})
        Review.objects.update(visible=False)
        self.assertEqual(Client().get("/api/reviews/").json()["items"],[])
        self.assertTrue(self.client.get("/api/reviews/").json()["has_review"])
    def test_registration_and_methods(self):
        self.assertEqual(self.post("register", {"username":"x","name":"X","email":"bad","password":"123"}).status_code,400)
        self.assertEqual(self.client.get("/api/login/").status_code,405)
        self.register()
        self.assertEqual(self.register().status_code,400)
        self.assertEqual(self.post("articles", {"title":"Forbidden"}).status_code,405)


class ArticleAdminTests(TestCase):
    def setUp(self):
        self.client.force_login(User.objects.create_superuser(
            username="editor", email="editor@example.com", password="test-password"
        ))

    def test_new_article_is_published_without_checkbox(self):
        response = self.client.get("/admin/portfolio/article/add/")
        self.assertEqual(response.status_code, 200)
        self.assertNotIn("published", response.context["adminform"].form.fields)
        response = self.client.post("/admin/portfolio/article/add/", {
            "title": "Admin article", "body": "Public text", "language": "uz",
            "_save": "Save",
        })
        self.assertEqual(response.status_code, 302)
        self.assertTrue(Article.objects.get(title="Admin article").published)
        items = Client().get("/api/articles/?lang=uz").json()["items"]
        self.assertEqual([item["title"] for item in items], ["Admin article"])

    def test_existing_article_can_be_hidden_and_published(self):
        article = Article.objects.create(title="Article", body="Text", published=True)
        url = f"/admin/portfolio/article/{article.pk}/change/"
        self.client.post(url, {
            "title": article.title, "body": article.body, "language": "uz", "_save": "Save",
        })
        article.refresh_from_db()
        self.assertFalse(article.published)
        self.assertEqual(Client().get("/api/articles/").json()["items"], [])
        self.client.post(url, {
            "title": article.title, "body": article.body, "language": "uz",
            "published": "on", "_save": "Save",
        })
        self.assertEqual(len(Client().get("/api/articles/").json()["items"]), 1)
