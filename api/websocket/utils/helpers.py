import json
import base64
import requests
import re

def extract_json_from_response(response_text):
    response_text = response_text.strip()
    if response_text.startswith("```json"):
        response_text = response_text[7:].strip()
    elif response_text.startswith("```"):
        response_text = response_text[3:].strip()
    if response_text.endswith("```"):
        response_text = response_text[:-3].strip()
    return json.loads(response_text)

def encode_image_to_base64(path):
    with open(path, "rb") as f:
        return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"

def get_json_text_from_url(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.text