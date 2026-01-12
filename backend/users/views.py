from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from django.db.models import Count
# Create your views here.

class GetUsersView(APIView):
  #! GET /api/users/
    def get(self, request):
      users = User.objects.all()
      serializer = UserSerializer(users, many=True)
      return Response(serializer.data)
      
class AddUserView(APIView):
  #! POST /api/users/add
  def post(self, request):
    name = request.data.get('name')
    isNameInValid = User.objects.filter(name=name).exists()
    if isNameInValid:
      return Response({"error": "Name already exists"}, status=status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(data={"name": name, "total_task": 0})
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)