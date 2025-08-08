def get_pdf_binary_from_html(html_content):
    """
    Converts HTML content to PDF and returns binary data (bytes) for direct download.
    """
    from io import BytesIO
    pdf_io = BytesIO()
    HTML(string=html_content).write_pdf(target=pdf_io)
    pdf_io.seek(0)
    return pdf_io.read()


def get_docx_binary_from_html(html_content):
    """
    Converts HTML content to DOCX and returns binary data (bytes) for direct download.
    """
    import tempfile
    with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as tmp_docx:
        pypandoc.convert_text(
            html_content,
            'docx',
            format='html',
            outputfile=tmp_docx.name,
            extra_args=['--standalone']
        )
        tmp_docx.seek(0)
        binary_data = tmp_docx.read()
    os.remove(tmp_docx.name)
    return binary_data
from django.conf import settings
import os
import pypandoc
from weasyprint import HTML

def convert_html_to_docx(html_content):
    """
    Converts an HTML content to a DOCX file using pypandoc.
    """
    input_file = os.path.join(settings.MEDIA_ROOT, "input.html")
    output_file = os.path.join(settings.MEDIA_ROOT, "output.docx")
    pypandoc.convert_text(
        html_content,
        'docx',
        format='html',
        outputfile=output_file,
        extra_args=['--standalone']
    )



def convert_html_to_pdf(html_content):
    """
    Converts an HTML content to a PDF file using WeasyPrint.
    """
    output_file = os.path.join(settings.MEDIA_ROOT, "output.pdf")
    HTML(string=html_content).write_pdf(output_file)