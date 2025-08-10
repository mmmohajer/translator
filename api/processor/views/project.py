from rest_framework import views, permissions, response, status

from config.utils.storage import upload_file_to_cloud, get_url_from_cloud
from core.utils.helpers import code_generator
from processor.serializers import UserProjectSerializer, PDFProjectDetailSerializer
from processor.models import UserProjectModel, PDFProjectDetailModel
from processor.models.project import PROJECT_TYPE_CHOICES

class UserProjectViewSet(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        try:
            user_projects = UserProjectModel.objects.filter(user=request.user)
            serializer = UserProjectSerializer(user_projects, many=True)
            return response.Response(status=status.HTTP_200_OK, data=serializer.data)
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"{str(e)}"})
    
    def post(self, request, format=None):
        try:
            project_name = request.data.get("project_name")
            if not project_name:
                return response.Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={"message": "Project name is required."}
                )
            if UserProjectModel.objects.filter(user=request.user, project_name=project_name).exists():
                return response.Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={"message": "Project with this name already exists."}
                )
            project_description = request.data.get("project_description", "")
            project_type = request.data.get("project_type", "process_pdf")
            if project_type not in dict(PROJECT_TYPE_CHOICES):
                return response.Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={"message": "Invalid project type."}
                )
            user_project = UserProjectModel.objects.create(user=request.user, project_name=project_name, project_description=project_description, project_type=project_type)
            serializer = UserProjectSerializer(user_project)
            return response.Response(status=status.HTTP_201_CREATED, data=serializer.data)
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"{str(e)}"})


class UserProjectDetailViewSet(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, uuid, format=None):
        try:
            user_project = UserProjectModel.objects.get(uuid=uuid, user=request.user)
            serializer = UserProjectSerializer(user_project)
            return response.Response(status=status.HTTP_200_OK, data=serializer.data)
        except UserProjectModel.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND, data={"message": "Project not found."})
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"{str(e)}"})

class PDFProjectDetailViewSet(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_project_uuid, format=None):
        try:
            pdf_file = request.FILES.get("pdf_file")
            print(pdf_file)
            if not pdf_file:
                return response.Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "No PDF file provided."})
            cur_project = UserProjectModel.objects.filter(uuid=user_project_uuid, user=request.user).first()
            if not cur_project:
                return response.Response(status=status.HTTP_404_NOT_FOUND, data={"message": "Project not found."})
            if cur_project.project_type != "process_pdf":
                return response.Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "This project is not a PDF processing project."})
            file_key = f"{request.user.uuid}/{code_generator()}_{pdf_file.name}"
            upload_success = upload_file_to_cloud(
                file=pdf_file,
                storage_space_name="user_data",
                file_key=file_key,
                file_type="private",
                is_from_client=True
            )
            if not upload_success:
                return response.Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"message": "Failed to upload PDF."})
            pdf_detail = PDFProjectDetailModel.objects.create(user_project=cur_project, file_key=file_key)
            serializer = PDFProjectDetailSerializer(pdf_detail)
            return response.Response(status=status.HTTP_200_OK, data=serializer.data)
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"{str(e)}"})

    def put(self, request, user_project_uuid, format=None):
        try:
            pdf_process_mode = request.data.get("pdf_process_mode")
            pdf_pages_to_process = request.data.get("pdf_pages_to_process", [])
            cur_project = UserProjectModel.objects.filter(uuid=user_project_uuid, user=request.user).first()
            if not cur_project:
                return response.Response(status=status.HTTP_404_NOT_FOUND, data={"message": "Project not found."})
            pdf_detail = PDFProjectDetailModel.objects.filter(user_project=cur_project).first()
            if not pdf_detail:
                return response.Response(status=status.HTTP_404_NOT_FOUND, data={"message": "PDF project detail not found."})
            if pdf_process_mode in ["all", "specific", "not_decided_yet"]:
                pdf_detail.pdf_process_mode = pdf_process_mode
            if isinstance(pdf_pages_to_process, list):
                pdf_detail.pdf_pages_to_process = pdf_pages_to_process
            pdf_detail.save()
            serializer = PDFProjectDetailSerializer(pdf_detail)
            return response.Response(status=status.HTTP_200_OK, data=serializer.data)
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"{str(e)}"})