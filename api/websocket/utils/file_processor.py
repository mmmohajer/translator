from PIL import Image, ImageEnhance, ImageFilter
import cv2
import numpy as np
from pdf2image import convert_from_path
import os

def crop_image_to_chunks(image, chunk_height=500):
    """
    Splits a PIL Image into vertical chunks of specified height.

    Args:
        image (PIL.Image): The input image.
        chunk_height (int): Height of each chunk in pixels.

    Returns:
        List[PIL.Image]: List of cropped image chunks.
    """
    width, height = image.size
    chunks = []
    for top in range(0, height, chunk_height):
        box = (0, top, width, min(top + chunk_height, height))
        chunk = image.crop(box)
        chunks.append(chunk)
    return chunks

def save_image_chunks(image, output_dir, chunk_height=500):
    """
    Crops the given image into vertical chunks and saves them in output_dir.

    Args:
        image (PIL.Image): The input image to crop.
        output_dir (str): Directory to save chunk images.
        chunk_height (int): Height of each chunk in pixels.

    Returns:
        List[str]: List of file paths to saved chunk images.
    """
    os.makedirs(output_dir, exist_ok=True)
    width, height = image.size
    chunk_paths = []
    for idx, top in enumerate(range(0, height, chunk_height), start=1):
        box = (0, top, width, min(top + chunk_height, height))
        chunk = image.crop(box)
        chunk_path = os.path.join(output_dir, f"chunk_{idx}.png")
        chunk.save(chunk_path)
        chunk_paths.append(chunk_path)
    return chunk_paths

def pdf_to_clean_image(pdf_path, output_path, dpi=300, page_number=1):
    """
    Convert a specific page of a PDF document to a cleaned, binarized grayscale image and save it to disk.

    This function performs the following steps:
    1. Converts the specified PDF page to an image using the given DPI.
    2. Transforms the image to grayscale for further processing.
    3. Applies binary thresholding to highlight text and shapes.
    4. Uses morphological closing to remove small holes and connect nearby elements.
    5. Inverts the image to produce a clean, white-background result.
    6. Saves the processed image to the specified output path.

    Args:
        pdf_path (str): Path to the input PDF file.
        output_path (str): Path to save the cleaned image file.
        dpi (int, optional): Resolution for PDF to image conversion. Default is 300.
        page_number (int, optional): Page number to convert (1-based index). Default is 1.

    Returns:
        str: The path to the saved cleaned image file.
    """
    pages = convert_from_path(pdf_path, dpi=dpi, first_page=page_number, last_page=page_number)
    img = pages[0]
    img_cv = np.array(img)
    img_cv = cv2.cvtColor(img_cv, cv2.COLOR_RGB2GRAY)
    _, binarized = cv2.threshold(img_cv, 180, 255, cv2.THRESH_BINARY_INV)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
    closed = cv2.morphologyEx(binarized, cv2.MORPH_CLOSE, kernel)
    final = cv2.bitwise_not(closed)
    cleaned_img = Image.fromarray(final)

    # Prepare folder structure: .../page_{n}/page.png and .../page_{n}/chunks/chunk_{i}.png
    page_folder = os.path.join(os.path.dirname(output_path), f"page_{page_number}")
    os.makedirs(page_folder, exist_ok=True)
    page_img_path = os.path.join(page_folder, "page.png")
    cleaned_img.save(page_img_path)

    chunks_dir = os.path.join(page_folder, "chunks")
    chunk_paths = save_image_chunks(cleaned_img, chunks_dir, chunk_height=1000)
    return page_img_path, chunk_paths