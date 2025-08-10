from rest_framework import serializers

from processor.models import UserProjectModel, PDFProjectDetailModel

class UserProjectSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserProjectModel
        fields = ['id', 'uuid', 'project_name', 'project_description', 'project_type', 'created_at', 'updated_at']


class PDFProjectDetailSerializer(serializers.ModelSerializer):
    project_name = serializers.SerializerMethodField(read_only=True)
    user_email = serializers.SerializerMethodField(read_only=True)

    def get_project_name(self, obj):
        return obj.user_project.project_name

    def get_user_email(self, obj):
        return obj.user_project.user.email

    class Meta:
        model = PDFProjectDetailModel
        fields = ['id', 'project_name', 'user_email', 'pdf_process_mode', 
                  'file_key', 'pdf_pages_to_process', 
                  'created_at', 'updated_at']

