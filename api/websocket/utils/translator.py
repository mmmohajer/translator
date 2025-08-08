from django.conf import settings
import openai
import json

from websocket.utils.helpers import get_json_text_from_url, extract_json_from_response

OPEN_AI_CLIENT = openai.OpenAI(api_key=settings.OPEN_AI_SECRET_KEY)

PROMPT_TOKENS_COST = 0.005 / 1000
COMPLETION_TOKENS_COST = 0.015 / 1000

def translate_chunk_using_ai(page_image_url, chunk_image_url, previous_translated_html="", translation_language="English"):
    """
    Translates a chunk of a page using OpenAI, preserving the page's structure in HTML.
    The full page image is provided for context; only the chunk is translated and appended to previous HTML.
    Images in the original are replaced with placeholders, and captions are translated.
    """
    messages = [
        {
            "role": "system",
            "content": (
                "You are an expert document translator. Your only job is to translate the content provided. Do not add any explanations, comments, suggestions, or extra content. Only provide the translation. You will receive the content of a page in sequential image chunks.\n"
                "Each chunk is a vertical slice of the page. Sentences may be split across chunks. If a sentence or content is already present in the previous HTML, do not repeat it. Use the full page image to resolve ambiguities and ensure contextually accurate translation. Only translate new, non-repeated content in this chunk.\n"
                "If you see that a sentence or phrase is incomplete in the current chunk, do not rush to translate it. Wait for the next chunk, as the sentence may be completed there.\n"
                "Use the full page image and the previously translated HTML for context, so you can produce a meaningful and accurate translation when the sentence is complete.\n"
                "The translation must be in HTML, preserving the original structure, including columns, headers, footers, headings, and any formatting.\n"
                "If the page contains images, insert a placeholder <div class='image-placeholder'></div> and translate any captions. Do not translate the entire page, only the new chunk, "
                f"and append it to the previous HTML content. Translate all extracted text to the target language: {translation_language}.\n"
                f"The output HTML must have all content in {translation_language}.\n"
                "IMPORTANT: Your translation should be fluent, natural, and highly readable in the target language. Use common phrases, idioms, and terms that native speakers would use, so the translation is easily understood and feels natural. Avoid robotic, literal, or awkward translations; ensure the result is clear, readable, and uses terminology and expressions that are familiar and common in the target language.\n"
                "If the document is a technical article (for example, software, engineering, or medical), use the correct technical vocabulary and terminology for the field. For example, in software contexts, translate terms like 'front end' using the standard term in the target language, not a literal or non-technical translation. Apply your intelligence and expertise to ensure the translation is meaningful, contextually accurate, and uses the terminology that professionals in the field would expect. Avoid literal or contextually incorrect translations.\n"
                "IMPORTANT: If you see content in the current chunk that appears to be repeated from the previous chunk, carefully check the full page image and the previously translated HTML. Only include the translation of the new chunk if it is not already present in the previous translation. Avoid unnecessary repetition; use the full context to ensure each chunk is translated properly and only once.\n"
                "IMPORTANT: If you are translating to a specific language, use only the appropriate words and terminology of that language.\n"
                "Do not mix languages in the main content. For example, if translating to Farsi, all words should be in Farsi and not mixed with English.\n"
                "If you must include an original English technical term for clarity, display it inline using <span class='text-red'>{original term}</span> so it appears in red, but only when absolutely necessary for technical accuracy.\n"
                "The main content must be fully in the target language with correct technical terms.\n"
                "If the chunk is empty or contains only whitespace, do not return any message, not even an apology or explanation—just return empty string."
            )
        },
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Here is the full page image for context:"},
                {"type": "image_url", "image_url": {"url": page_image_url}},
                {"type": "text", "text": "Here is the chunk to translate:"},
                {"type": "image_url", "image_url": {"url": chunk_image_url}},
                {"type": "text", "text": (
                    "Here is the previously translated HTML for this page. "
                    "Please append the translation of the new chunk, keeping the structure and context consistent. "
                    f"Translate all visible text in the chunk to {translation_language}. The output HTML must have all content in {translation_language}.\n"
                    "IMPORTANT: To ensure the translation is complete, readable, and contextually accurate, always refer to the image of the whole page as well as the chunk. If you see a part of the chunk that is incomplete, unclear, or not fully readable, use the whole page image to help complete or clarify the translation for this chunk. If any part of the chunk is invisible or ambiguous, use the whole page image to resolve it, but focus only on translating the content of this chunk.\n"
                    f"{previous_translated_html}"
                )}
            ]
        }
    ]

    response = OPEN_AI_CLIENT.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=5000
    )
    tokens_used = response.usage
    prompt_tokens = tokens_used.prompt_tokens
    completion_tokens = tokens_used.completion_tokens
    cost = (prompt_tokens * PROMPT_TOKENS_COST + completion_tokens * COMPLETION_TOKENS_COST)
    response_html = ""
    if response.choices and response.choices[0].message:
        response_html = response.choices[0].message.content.strip()
    if response_html.startswith("```html"):
        response_html = response_html[len("```html"):].strip()
    if response_html.endswith("```"):
        response_html = response_html[:-3].strip()
    
    return {"respose": response_html, "cost": cost}