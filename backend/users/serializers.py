
from rest_framework import serializers
from .models import User
from tasks.models import Task

class UserSerializer(serializers.ModelSerializer):
    total_task = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'name', 'total_task', 'created_at', 'updated_at']
    
    def get_total_task(self, obj):

        return Task.objects.filter(user=obj).count()