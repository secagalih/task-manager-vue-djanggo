from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
# Create your views here.


class GetTasksView(APIView):
  #! GET /api/tasks/
  def get(self, request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)
  
class AddTaskView(APIView):
  #! POST /api/tasks/
  def post(self, request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  
  class UpdateTaskView(APIView):
    #! post /api/update/<id>/
    def post(self, request, id):
      task = Task.objects.get(id=id)
      serializer = TaskSerializer(task, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  class DeleteTaskView(APIView):
    #! delete /api/delete/<id>/
    def post(self, request, id):
      task = Task.objects.get(id=id)
      if task:
        task.delete()
        return Response({"message": "Task deleted successfully"}, status=status.HTTP_200_OK)
      return Response({"message": "Task not found"}, status=status.HTTP_404_NOT_FOUND)
