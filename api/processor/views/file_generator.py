from rest_framework import views, permissions, response, status

from processor.utils.file_convertor import get_pdf_binary_from_html, get_docx_binary_from_html


class FileGeneratorToDownloadViewSet(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        from django.http import HttpResponse
        try:
            html_contnt = request.data.get("html_content", "")
            if not html_contnt:
                return response.Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={"message": "HTML content is required."}
                )
            doc_type = request.data.get("doc_type", "pdf").lower()
            if doc_type == "docx":
                docx_binary = get_docx_binary_from_html(html_contnt)
                resp = HttpResponse(docx_binary, content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
                resp['Content-Disposition'] = 'attachment; filename="output.docx"'
                return resp
            elif doc_type == "pdf":
                pdf_binary = get_pdf_binary_from_html(html_contnt)
                resp = HttpResponse(pdf_binary, content_type="application/pdf")
                resp['Content-Disposition'] = 'attachment; filename="output.pdf"'
                return resp
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"{str(e)}"})

