#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import base64
from dotenv import load_dotenv
from openai import OpenAI
from mistralai import Mistral

load_dotenv()
mistral_api_key = os.environ["MISTRAL_API_KEY"]

mistral = Mistral(api_key=mistral_api_key)
openai = OpenAI()

def encode_image(image_path):
    """Encode the image to base64."""
    try:
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    except FileNotFoundError:
        print(f"Error: The file {image_path} was not found.")
        return None
    except Exception as e:  # Added general exception handling
        print(f"Error: {e}")
        return None

image_path = "sketch.jpg"
base64_image = encode_image(image_path)
model = "pixtral-12b-2409"

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "Describe the design for the clothing in the image."
            },
            {
                "type": "image_url",
                "image_url": f"data:image/jpeg;base64,{base64_image}" 
            }
        ]
    }
]

# Get the chat response
chat_response = mistral.chat.complete(
    model=model,
    messages=messages
)

# Print the content of the response
caption = (chat_response.choices[0].message.content)
print(caption)

response = openai.images.generate(
  model="dall-e-3",
  prompt=caption,
  size="1024x1024",
  quality="standard",
  n=1,
)

print(response.data[0].url)

