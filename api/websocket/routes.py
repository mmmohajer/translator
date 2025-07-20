from django.urls import path

from . import consumers

URL_PATHS = [
    path("wss/test-socket/", consumers.TestSocketConsumer),
]
