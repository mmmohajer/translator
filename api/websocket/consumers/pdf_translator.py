from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import os
from pdf2image import pdfinfo_from_path

from core.utils.helpers import code_generator
from websocket.utils.file_processor import pdf_to_clean_image
from websocket.utils.translator import translate_chunk_using_ai

class TranslatePDFSocketConsumer(AsyncWebsocketConsumer):
    def _prepare_output_dirs(self):
        folder_name = code_generator(16)
        file_name = code_generator(8)
        output_dir = f"/websocket_tmp/{folder_name}"
        os.makedirs(output_dir, exist_ok=True)
        pdf_path = f"{output_dir}/{file_name}.pdf"
        images_dir = os.path.join(output_dir, "images")
        os.makedirs(images_dir, exist_ok=True)
        return pdf_path, images_dir

    def _get_url_for_image(self, image_path):
        from django.conf import settings
        # Find the relative path from websocket_tmp
        base_dir = "/websocket_tmp/"
        abs_base_dir = os.path.abspath(base_dir)
        abs_image_path = os.path.abspath(image_path)
        rel_path = os.path.relpath(abs_image_path, abs_base_dir)
        # Compose the URL
        return f"{settings.CLIENT_URL}/websocket_tmp/{rel_path}"
    
    def _write_pdf(self, path, data):
        with open(path, "wb") as f:
            f.write(data)
    
    async def _write_pdf_async(self, pdf_path, bytes_data):
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, self._write_pdf, pdf_path, bytes_data)

    async def _get_pdf_info_async(self, pdf_path):
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, pdfinfo_from_path, pdf_path)

    async def _process_images_async(self, pdf_path, images_dir, total_pages):
        loop = asyncio.get_event_loop()
        previous_html = ""
        await self._send_json({"file_status": "processing"})
        for i in range(1, total_pages + 1):
            await self._send_json({"page_to_process": i})
            image_path = os.path.join(images_dir, f"{i}.png")
            page_img_path, chunk_paths = await loop.run_in_executor(
                None, pdf_to_clean_image, pdf_path, image_path, 300, i
            )
            for chunk_path in chunk_paths:
                page_image_url = self._get_url_for_image(page_img_path)
                chunk_image_url = self._get_url_for_image(chunk_path)
                ai_data = await loop.run_in_executor(
                    None,
                    translate_chunk_using_ai,
                    page_image_url,
                    chunk_image_url,
                    previous_html,
                    "English"
                )
                translated_html = ai_data["respose"]
                cost = ai_data["cost"]
                previous_html = translated_html
                await self._send_json({
                    "page": i,
                    "translated_html": translated_html,
                    "cost": cost,
                })
            await self._send_json({
                "finalized_page_html": previous_html,
                "page": i
            })

    async def _send_json(self, data):
        await self.send(text_data=json.dumps(data))
    
    async def _process_file(self, bytes_data):
        try:
            await self._send_json({"file_status": "received"})
            pdf_path, images_dir = self._prepare_output_dirs()
            await self._write_pdf_async(pdf_path, bytes_data)
            await self._send_json({"file_status": "uploaded"})
            info = await self._get_pdf_info_async(pdf_path)
            total_pages = info["Pages"]
            await self._send_json({"number_of_pdf_total_pages": total_pages})
            await self._process_images_async(pdf_path, images_dir, total_pages)
            await self._send_json({"file_status": "completed"})
        except Exception as e:
            print(f"Error processing file: {e}")
    
    async def connect(self):
        await self.accept()
        await self._send_json({
            "message": "Connected to test socket"
        })

    async def disconnect(self, close_code):
        await self._send_json({
            "message": "Disconnected from test socket"
        })

    async def receive(self, text_data=None, bytes_data=None):
        try:
            if text_data is not None:
                data = json.loads(text_data)
                pass
            elif bytes_data is not None:
                asyncio.create_task(self._process_file(bytes_data))
        except Exception as e:
            print(e)