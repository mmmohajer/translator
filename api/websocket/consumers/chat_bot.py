from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from urllib.parse import parse_qs
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio

from config.utils.storage import get_url_from_cloud
from processor.models import UserProjectModel, PDFProjectDetailModel
from websocket.utils.helpers import extract_pages_from_json_db


User = get_user_model()

class ChatBotConsumer(AsyncWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.project_uuid = None
        self.user_project = None
        self.pdf_project = None
        self.pdf_link = None
        self.pdf_process_mode = None
        self.pdf_pages_to_process = None
        self.user = None

    async def _send_json(self, data):
        await self.send(text_data=json.dumps(data))

    async def _find_project_details(self, data):
        try:
            if 'uuid' not in data:
                await self._send_json({
                    "error": "UUID not provided",
                    "disconnection": True,
                    "remove_loader": True
                })
                return
            self.project_uuid = data['uuid']
            self.user_project = await sync_to_async(lambda: UserProjectModel.objects.filter(uuid=self.project_uuid, user=self.user).first())()
            if not self.user_project:
                await self._send_json({
                    "error": "Project not found",
                    "disconnection": True,
                    "remove_loader": True
                })
                return
            if self.user_project.project_type == "process_pdf":
                await self._send_json({
                    "bot_message": "I see that this project is a PDF processing project. Let me assist you with that.",
                    "project_type": "process_pdf",
                    "remove_loader": True
                })
                return
        except Exception as e:
            await self._send_json({
                "error": f"An error occurred: {str(e)}",
                "disconnection": True,
                "remove_loader": True
            })
            return

    async def _find_pdf_file(self):
        try:
            if not self.project_uuid:
                await self._send_json({
                    "error": "UUID not provided",
                    "disconnection": True,
                    "remove_loader": True
                })
                return
            self.pdf_project = await sync_to_async(lambda: PDFProjectDetailModel.objects.filter(user_project__uuid=self.project_uuid, user_project__user=self.user).first())()
            self.pdf_process_mode = self.pdf_project.pdf_process_mode if self.pdf_project else None
            self.pdf_pages_to_process = self.pdf_project.pdf_pages_to_process if self.pdf_project else None
            if not self.pdf_project:
                await self._send_json({
                    "bot_message": "Please upload a PDF file to process.",
                    "user_task": "upload_pdf",
                    "remove_loader": True
                })
                return
            self.pdf_link = await sync_to_async(get_url_from_cloud)(
                storage_space_name="user_data",
                file_key=self.pdf_project.file_key,
                file_type="private",
                expires_in=3600
            )
            await self._handle_pdf_project_after_having_the_pdf_link()
        except Exception as e:
            await self._send_json({
                "error": f"An error occurred: {str(e)}",
                "disconnection": True,
                "remove_loader": True
            })
            return
    
    async def _get_pdf_link(self):
        try:
            if not self.pdf_project:
                await self._send_json({
                    "error": "PDF project not found",
                    "disconnection": True,
                    "remove_loader": True
                })
                return
            self.pdf_link = await sync_to_async(get_url_from_cloud)(
                storage_space_name="user_data",
                file_key=self.pdf_project.file_key,
                file_type="private",
                expires_in=3600
            )
            await self._handle_pdf_project_after_having_the_pdf_link()
            return
        except Exception as e:
            await self._send_json({
                "error": f"An error occurred: {str(e)}",
                "disconnection": True,
                "remove_loader": True
            })
            return

    async def _handle_pdf_project_after_having_the_pdf_link(self):
        try:
            if self.pdf_process_mode == "not_decided_yet":
                await self._send_json({
                    "bot_message": "Your PDF file is ready! How would you like to process it?",
                    "user_task": "select_pdf_process_mode",
                    "remove_loader": True
                })
                return
            if self.pdf_process_mode == "all":
                await self._send_json({
                    "bot_message": "Your PDF file is ready. What would you like to do next?",
                    "user_task": "select_action",
                    "remove_loader": True
                })
                return
            if self.pdf_process_mode == "specific":
                if not self.pdf_pages_to_process:
                    await self._send_json({
                        "bot_message": "Your PDF file is ready. Please select the pages you want to process.",
                        "user_task": "select_pages_to_process",
                        "remove_loader": True
                    })
                    return
                await self._send_json({
                    "bot_message": (
                        f"Your PDF file is ready. You have chosen to process the following pages: "
                        f"{self.pdf_pages_to_process}. Please confirm your selection."
                    ),
                    "user_task": "select_pages_to_process",
                    "remove_loader": True
                })
                return
        except Exception as e:
            await self._send_json({
                "error": f"An error occurred: {str(e)}",
                "disconnection": True,
                "remove_loader": True
            })
            return

    async def _find_pdf_pages_to_process(self):
        try:
            if self.pdf_process_mode == "not_decided_yet":
                await self._send_json({
                    "bot_message": "Please select how you want to process the PDF.",
                    "user_task": "select_pdf_process_mode",
                    "remove_loader": True
                })
                return
            if self.pdf_process_mode == "specific":
                if not self.pdf_pages_to_process:
                    await self._send_json({
                        "bot_message": "Please select the pages you want to process.",
                        "user_task": "select_pages_to_process",
                        "remove_loader": True
                    })
                    return
                await self._send_json({
                    "bot_message": (
                        f"You have selected to process the following pages: {self.pdf_project.pdf_pages_to_process}. "
                        f"Please confirm your selection."
                    ),
                    "user_task": "confirm_pages_to_process",
                    "remove_loader": True
                })
            elif self.pdf_process_mode == "all":
                await self._send_json({
                    "bot_message": "You have selected to process the entire PDF. What would you like to do next?",
                    "user_task": "select_action",
                    "remove_loader": True
                })
            else:
                await self._send_json({
                    "bot_message": "Please select how you want to process the PDF.",
                    "user_task": "select_pdf_process_mode",
                    "remove_loader": True
                })
        except Exception as e:
            await self._send_json({
                "error": f"An error occurred: {str(e)}",
                "disconnection": True,
                "remove_loader": True
            })
    # -------------------------------------------
    # WebSocket connection management
    # -------------------------------------------
    async def connect(self):
        query_string = self.scope['query_string'].decode()
        token = parse_qs(query_string).get('token', [None])[0]
        if token:
            try:
                access_token = AccessToken(token)
                user_id = access_token['user_id']
                self.user = await sync_to_async(User.objects.get)(id=user_id)
                await self.accept()
                await self._send_json({
                    "connection": True,
                    "remove_loader": True,
                    "user_authenticated": True,
                    "bot_message": "Hello! I'm your AI assistant 🤖✨—ready to help you with anything you need. Let's start by reviewing your project details together!"
                })
            except Exception:
                await self.accept()
                await self._send_json({
                    "connection": True,
                    "remove_loader": True,
                    "user_authenticated": False,
                    "bot_message": "Sorry, I couldn't authenticate you. Please reconnect."
                })
        

    async def disconnect(self, close_code):
        await self._send_json({
            "disconnection": True,
            "remove_loader": True,
        })

    async def receive(self, text_data=None, bytes_data=None):
        try:
            if text_data is not None:
                data = json.loads(text_data)
                print(data)
                if "pdf_process_mode" in data:
                    self.pdf_process_mode = data["pdf_process_mode"]
                if "pdf_pages_to_process" in data:
                    self.pdf_pages_to_process = data["pdf_pages_to_process"]

                if "task" in data and data["task"] == "find_project_details":
                    await self._find_project_details(data)
                if "task" in data and data["task"] == "find_pdf_file":
                    await self._find_pdf_file()
                if "task" in data and data["task"] == "send_pdf_link":
                    await self._get_pdf_link()
                if "task" in data and data["task"] == "find_pdf_pages_to_process":
                    await self._find_pdf_pages_to_process()
            elif bytes_data is not None:
                print("Received binary data:", bytes_data)
        except Exception as e:
            print(e)