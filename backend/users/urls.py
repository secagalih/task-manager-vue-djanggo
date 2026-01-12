from django.urls import path

from .views import GetUsersView, AddUserView

urlpatterns = [
    path('', GetUsersView.as_view(), name='users-list'),
    path('add/', AddUserView.as_view(), name='add_user'),
]