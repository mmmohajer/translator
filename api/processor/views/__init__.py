from processor.views import file_generator, project

FileGeneratorToDownloadViewSet = file_generator.FileGeneratorToDownloadViewSet.as_view()

UserProjectViewSet = project.UserProjectViewSet.as_view()
UserProjectDetailViewSet = project.UserProjectDetailViewSet.as_view()
PDFProjectDetailViewSet = project.PDFProjectDetailViewSet.as_view()