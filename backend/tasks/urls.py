from django.urls import path

from .views import GetTasksByUserIdView, AddTaskView, UpdateTaskView, DeleteTaskView

urlpatterns = [
    path('user/<int:user_id>/', GetTasksByUserIdView.as_view(), name='tasks-list'),
    path('', AddTaskView.as_view(), name='add_task'),
    path('update/<str:id>/', UpdateTaskView.as_view(), name='update_task'),
    path('delete/<str:id>/', DeleteTaskView.as_view(), name='delete_task'),
]