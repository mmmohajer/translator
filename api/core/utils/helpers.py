import random
import string

def get_media_upload_path(instance, filename):
    folder = instance.post_type.lower()
    return f"{folder}/{filename}"

def code_generator(size=16, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))