from django.urls import path

from .views import GetTasksByUserIdView, AddTaskView, UpdateTaskView, DeleteTaskView

urlpatterns = [
 
    path('add/', AddTaskView.as_view(), name='add_task'),
    path('update/<str:id>/', UpdateTaskView.as_view(), name='update_task'),
    path('delete/<str:id>/', DeleteTaskView.as_view(), name='delete_task'),
]