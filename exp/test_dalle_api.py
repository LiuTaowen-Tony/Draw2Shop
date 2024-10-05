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

image_path = "sketch2.jpg"
base64_image = encode_image(image_path)
model = "pixtral-12b-2409"

user_input = 'A t-shirt with heart image on it.with short sleeve'
prompt = """
Please generate a detailed fashion design description based on the input picture and this information: {}. 
Tailor the description to the specific type of garment (e.g., t-shirt, jacket, coat, dress, skirt) 
and focus on the most relevant features for that garment. Include details such as:

- Collar type (e.g., round, V-neck, mandarin, or other styles)
- Sleeve design and length (e.g., short, long, sleeveless)
- Hemline style and overall garment length (e.g., waist-length, knee-length, ankle-length)
- Fit (e.g., loose, slim, tailored)
- Notable design elements (e.g., buttons, zippers, pockets, patterns, logos, or embellishments)
- Fabric texture, material (e.g., cotton, wool, polyester), and color.

Ensure that the description accurately reflects all visible design elements from the sketch and provides a clear understanding of the garment's aesthetic and functional aspects.
""".format(user_input)

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": prompt
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

caption = (chat_response.choices[0].message.content + "please output a simple line drawing sketch of the front of the clothes")
# caption = (chat_response.choices[0].message.content + "please output an online retail product picture，Please ensure that there is only one product in the output image")
print(caption)

response = openai.images.generate(
  model="dall-e-3",
  prompt=caption,
  size="1024x1024",
  quality="standard",
  n=1,
)

print(response.data[0].url)

