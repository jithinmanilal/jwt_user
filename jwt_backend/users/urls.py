from django.urls import path
from .views import RegisterView, RetrieveUserView, UserListView, UserCreateView, UserDeleteView, UserUpdateView, UserImageUpload
urlpatterns = [
     path('register/', RegisterView.as_view()),
     path('me/', RetrieveUserView.as_view()),
     path('list/', UserListView.as_view()),
     path('update/', UserUpdateView.as_view()),
     path('add/', UserCreateView.as_view()),
     path('image/', UserImageUpload.as_view()),
     path('delete/<int:pk>', UserDeleteView.as_view()),
]
