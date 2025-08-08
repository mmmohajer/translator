from pathlib import Path
import os

# ---------------- BEGINNING OF GENERAL VARS ----------------

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("SECRET_KEY", "SECRET_KEY")

DEBUG = bool(int(os.environ.get("DEBUG", 1)))

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split(",")
CSRF_TRUSTED_ORIGINS = os.environ.get("CSRF_TRUSTED_ORIGINS", "").split(",")

LANGUAGE_CODE = 'en-us'
USE_I18N = True

TIME_ZONE = 'America/New_York'
USE_TZ = True 
CELERY_TIMEZONE = 'America/New_York'
CELERY_ENABLE_UTC = True

USE_I18N = True

ROOT_URLCONF = 'config.urls'

WSGI_APPLICATION = 'config.wsgi.application'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'core.User'

ADMIN_URL = os.environ.get("ADMIN_URL", "admin")

# ---------------- END OF GENERAL VARS ----------------

# ---------------- BEGINNING OF STORAGE & MEDIA VARS ----------------

STORAGE_ACCESS_KEY = os.environ.get(
    "STORAGE_ACCESS_KEY", "STORAGE_ACCESS_KEY")
STORAGE_SECRET_KEY = os.environ.get(
    "STORAGE_SECRET_KEY", "STORAGE_SECRET_KEY")
STORAGE_END_POINT_URL = os.environ.get(
    "STORAGE_END_POINT_URL", "STORAGE_END_POINT_URL")
STORAGE_END_POINT_CDN_URL = os.environ.get(
    "STORAGE_END_POINT_CDN_URL", "STORAGE_END_POINT_CDN_URL")

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_ACCESS_KEY_ID = STORAGE_ACCESS_KEY
AWS_SECRET_ACCESS_KEY = STORAGE_SECRET_KEY
AWS_S3_REGION_NAME = 'tor1'
AWS_S3_ENDPOINT_URL = STORAGE_END_POINT_URL

STATIC_URL = '/static/static/'
STATIC_ROOT = './vol/static'

MEDIA_URL = f"{STORAGE_END_POINT_CDN_URL}/media/"
MEDIA_ROOT = './vol/media'

# ---------------- END OF STORAGE & MEDIA VARS ----------------

# ---------------- BEGINNING OF CONSTANT VARS ----------------

CLIENT_URL = os.environ.get("CLIENT_URL", "https://makeclient.ngrok.io")

GOOGLE_AUTH_CLIENT_ID = os.environ.get("GOOGLE_AUTH_CLIENT_ID", "GOOGLE_AUTH_CLIENT_ID")
GOOGLE_AUTH_CLIENT_SECRET = os.environ.get("GOOGLE_AUTH_CLIENT_SECRET", "GOOGLE_AUTH_CLIENT_SECRET")

OPEN_AI_SECRET_KEY = os.environ.get("OPEN_AI_SECRET_KEY", "OPEN_AI_SECRET_KEY")
# ---------------- END OF CONSTANT VARS ----------------