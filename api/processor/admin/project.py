from django.contrib import admin

class UserProjectAdmin(admin.ModelAdmin):
    autocomplete_fields = ['user']
    list_display = ["project_name", "user_email"]
    list_per_page = 10
    list_select_related = ['user']
    search_fields = ["project_name__icontains", "user_email__icontains"]
    list_filter = ['project_type']

    def user_email(self, obj):
        return obj.user.email


class PDFProjectDetailAdmin(admin.ModelAdmin):
    autocomplete_fields = ['user_project']
    list_display = ["project_name", "user_email", "pdf_process_mode"]
    list_per_page = 10
    list_select_related = ['user_project']
    search_fields = ["user_project__project_name__icontains", "user_email__icontains"]

    def project_name(self, obj):
        return obj.user_project.project_name

    def user_email(self, obj):
        return obj.user_project.user.email