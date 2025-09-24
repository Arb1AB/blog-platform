from django.urls import path
from django.http import JsonResponse
from .views import RegisterView, LoginView, ProfileView

# Root view for /api/accounts/
def accounts_root(request):
    return JsonResponse({
        "register": "/api/accounts/register/",
        "login": "/api/accounts/login/",
        "profile": "/api/accounts/profile/",
    })

urlpatterns = [
    path("", accounts_root, name="accounts-root"),  # 👈 now /api/accounts/ works
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
]
