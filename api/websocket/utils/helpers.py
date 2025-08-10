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

def extract_pages_from_json_db(json_field):
    # If it's a string, try to load as JSON
    if isinstance(json_field, str):
        try:
            json_field = json.loads(json_field)
        except Exception:
            return []
    # If it's not a list, return empty
    if not isinstance(json_field, list):
        return []
    pages = []
    for item in json_field:
        if isinstance(item, int):
            pages.append(item)
        elif isinstance(item, str) and re.match(r"^\d+-\d+$", item):
            start, end = map(int, item.split("-"))
            if start <= end:
                pages.extend(range(start, end + 1))
    return pages