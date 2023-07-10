from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserCreateSerializer, UserSerializer, UserListSerializer
from .models import JwtUser
from rest_framework.parsers import MultiPartParser, FormParser

class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)
        
        return Response(user.data, status=status.HTTP_201_CREATED)

class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)
    
class UserListView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        listObj = JwtUser.objects.all()
        listSerializeObj = UserListSerializer(listObj, many=True)
        return Response(listSerializeObj.data)
    
class UserCreateView(APIView):
    def post(self, request):
        serializeobj = UserListSerializer(data=request.data)
        if serializeobj.is_valid():
            serializeobj.save()
            return Response(200)
        return Response(serializeobj.errors)
    
class UserUpdateView(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('id')
            user_obj = JwtUser.objects.get(pk=user_id)
        except JwtUser.DoesNotExist:
            return Response("User not found in the database.", status=status.HTTP_404_NOT_FOUND)

        serializeobj = UserListSerializer(user_obj, data=request.data, partial=True)
        if serializeobj.is_valid():
            for field in serializeobj.validated_data:
                setattr(user_obj, field, serializeobj.validated_data[field])
            user_obj.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializeobj.errors, status=status.HTTP_400_BAD_REQUEST)

    
class UserDeleteView(APIView):
    def post(self, request, pk):
        try:
            user_obj = JwtUser.objects.get(pk=pk)
        except:
            return Response("Not Found in DB.")

        user_obj.delete()
        return Response(200)


class UserImageUpload(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
