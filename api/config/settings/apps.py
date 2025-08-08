DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework_simplejwt.token_blacklist',
]

LOCAL_APPS = [
    "core",
    "websocket",
    "processor"
]

INSTALLED_APPS = DJANGO_APPS + LOCAL_APPS