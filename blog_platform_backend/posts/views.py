# posts/views.py
from django.http import HttpResponse

def index(request):
    return HttpResponse("Posts API is working 🚀")
