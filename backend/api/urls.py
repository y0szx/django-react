from django.urls import path
from .views import greetings, FormViewSet, UserViewSet


urlpatterns = [
    path('api/users/login/',
         UserViewSet.as_view({'post': 'login'}), name='login'),
    path('api/users/register/',
         UserViewSet.as_view({'post': 'register'}), name='register'),
    path('api/homepage/', greetings, name='homepage'),
    path('api/form/submit_greeting/',
         FormViewSet.as_view({'post': 'submit_greeting'}), name='submit_greeting'),
    path('api/form/translate_text/',
         FormViewSet.as_view({'post': 'translate_text'}), name='translate_text'),
    path('api/form/submit_joke/',
         FormViewSet.as_view({'post': 'submit_joke'}), name='submit_joke'),
]
