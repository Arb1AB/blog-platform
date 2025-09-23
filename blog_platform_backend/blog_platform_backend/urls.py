from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def api_root(request):
    return JsonResponse({
        "accounts": "/api/accounts/",
        "posts": "/api/posts/"
    })


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api_root),  # ✅ API root
    path("api/accounts/", include("accounts.urls")),
    path("api/posts/", include("posts.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
