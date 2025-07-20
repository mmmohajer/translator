from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio

class TestSocketConsumer(AsyncWebsocketConsumer):

    async def _send_json(self, data):
        await self.send(text_data=json.dumps(data))

    async def connect(self):
        await self.accept()
        await self._send_json({
            "message": "Connected to test socket"
        })

    async def disconnect(self, close_code):
        await self._send_json({
            "message": "Disconnected from test socket"
        })

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            print("Received data:", data)
        except Exception as e:
            print(e)