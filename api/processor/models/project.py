from django.db import models
from django.conf import settings

from core.models.base_model import TimeStampedUUIDModel, TimeStampedModel

PROJECT_TYPE_CHOICES = [
   ("process_pdf", "Process PDF"),
   ("process_img", "Process Image"),
   ("process_txt", "Process Text"),
   ("process_audio", "Process Audio"),
   ("translator", "Translator"),
]

PDF_PROCESS_MODE_CHOICES = [
    ("all", "Process entire PDF"),
    ("specific", "Process specific pages"),
    ("not_decided_yet", "Not decided yet"),
]



class UserProject(TimeStampedUUIDModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, related_name='user_projects')
    project_name = models.CharField(max_length=255)
    project_description = models.TextField(blank=True, null=True)
    project_type = models.CharField(
        max_length=50, choices=PROJECT_TYPE_CHOICES)

    def __str__(self):
        return f"Project for {self.user.email}"

    class Meta:
        verbose_name_plural = "User Projects"
        ordering = ('id',)


class PDFProjectDetail(TimeStampedModel):
    user_project = models.OneToOneField(UserProject, on_delete=models.CASCADE, related_name='pdf_details')
    file_key = models.CharField(max_length=256, unique=True)
    pdf_process_mode = models.CharField(
        max_length=20, choices=PDF_PROCESS_MODE_CHOICES, default="not_decided_yet"
    )
    pdf_pages_to_process = models.JSONField(blank=True, null=True)
    
    def __str__(self):
        return f"Project for {self.user_project.user.email} named {self.user_project.project_name}"

    class Meta:
        verbose_name_plural = "PDF Project Details"
        ordering = ('id',)

