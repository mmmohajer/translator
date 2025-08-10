from django.contrib import admin

from processor.admin import project
from processor.models import UserProjectModel, PDFProjectDetailModel

admin.site.register(UserProjectModel, project.UserProjectAdmin)
admin.site.register(PDFProjectDetailModel, project.PDFProjectDetailAdmin)