# Blog Platform

## 1. Project Overview
The Blog Platform is a full-stack application that enables users to:
- Publish blog posts
- Comment with nested replies
- Upvote posts and comments
- Manage profiles (bio, avatar, reputation)
- View community analytics in an admin dashboard

**Tech Stack:**
- Backend: Django REST Framework
- Frontend: React.js
- Database: PostgreSQL (with SQLite fallback for dev)
- Deployment: Docker + Gunicorn
- Authentication: JWT (djangorestframework-simplejwt)

---

## 2. System Architecture

[Frontend: React] <--> [Backend: Django REST API] <--> [Database: PostgreSQL]
| |
|----> JWT Authentication <-|


- **Frontend (React)** → Handles UI, routing, API calls
- **Backend (Django REST)** → Manages authentication, posts, comments, analytics
- **Database (Postgres)** → Stores persistent data
- **JWT Authentication** → Protects API endpoints

---

## 3. Backend (Django + DRF)

### 3.1 Accounts App
Handles authentication and profile management.

**Profile Model:**
```python
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    reputation = models.IntegerField(default=0)

Signals:

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

Views:

    RegisterView: Validates user, creates Profile

    LoginView: Returns JWT (refresh, access)

    ProfileView: Get/update user profile

3.2 Posts App

Handles blog content, comments, and tags.

Post Model:

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True)
    views = models.PositiveIntegerField(default=0)
    upvotes = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

Comment Model (nested replies):

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name="replies")
    content = models.TextField()
    upvotes = models.IntegerField(default=0)

Business Logic:

    Auto slug creation with slugify

    Nested replies via parent field

    Upvoting increments counters

    AnalyticsOverviewView aggregates totals

Serializers:

    PostSerializer: Includes tags + comments

    CommentSerializer: Recursive replies

3.3 Configuration

    settings.py:

        DATABASE_URL via dj-database-url

        django-cors-headers for CORS

        whitenoise for static files

        DRF + JWT configuration

    urls.py:

urlpatterns = [
    path("api/accounts/", include("accounts.urls")),
    path("api/posts/", include("posts.urls")),
]

3.4 Deployment

Gunicorn as WSGI server.

Backend Dockerfile:

FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD gunicorn blog_platform_backend.wsgi:application --bind 0.0.0.0:8000

Entrypoint Script:

#!/bin/sh
python manage.py migrate
python manage.py collectstatic --noinput
exec "$@"

4. Frontend (React)
Core Components

    MatrixBackground: Canvas cyberpunk animation

    Navbar: Conditional links based on auth

    Notification: Auto-dismiss popups

    PrivateRoute: Restricts routes

Pages

    Home – landing page

    Login/Register – forms with JWT storage in localStorage

    Profile – update bio + avatar

    Posts/PostDetail – CRUD posts, upvotes, comments

    NewPost – Markdown editor with preview

    AdminDashboard – Analytics (Chart.js)

API Layer (api.js)

Centralized fetch calls:

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

Styling

    Theme: #a64dff, #1a001f, #0a0a0a

    Matrix effect integrated in all pages

    Forms + buttons styled with hover effects

Deployment

Frontend Dockerfile:

FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npx", "serve", "-s", "build", "-l", "3000"]

5. Database

    PostgreSQL in production

    SQLite for dev fallback

    Migrations:

        0001_initial.py: Creates Profile, Post, Comment, Tag

        Later: Adds is_draft, nested replies

6. Security

    JWT: Access + Refresh tokens

    Password Hashing: Django PBKDF2

    CORS: Currently open, restrict in production

    Future: Role-based access, CSRF tokens, rate limiting

7. API Reference & Examples

Register

POST /api/accounts/register/
{
  "username": "alice",
  "email": "alice@mail.com",
  "password": "12345"
}

Login

POST /api/accounts/login/
{
  "username": "alice",
  "password": "12345"
}

Response:
{
  "refresh": "jwt-refresh-token",
  "access": "jwt-access-token"
}

Create Post

POST /api/posts/
Authorization: Bearer <token>
{
  "title": "My First Post",
  "content": "Hello world!",
  "tags": [{"name": "intro"}]
}

Analytics

GET /api/posts/analytics/overview/

Response:
{
  "total_posts": 12,
  "total_comments": 34,
  "total_views": 890,
  "top_users": [
    {"username": "alice", "reputation": 120},
    {"username": "bob", "reputation": 90}
  ]
}

8. Deployment Guide

Local Dev

python manage.py migrate
python manage.py runserver
npm start

Docker

docker-compose up --build

Environment Variables

    DATABASE_URL

    DJANGO_SECRET_KEY

    DEBUG

9. Analytics & Admin Dashboard

    Aggregates posts, comments, views

    Shows top users

    Chart.js used for frontend visualization

10. Future Improvements

    Rich text editor with image upload

    Notifications for replies

    Pagination for posts/comments

    CI/CD pipeline
