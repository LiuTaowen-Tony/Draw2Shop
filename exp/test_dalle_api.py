#!/usr/bin/env python
# -*- coding: utf-8 -*-
#%%

import os
import base64
from dotenv import load_dotenv
from openai import OpenAI
from mistralai import Mistral
import serpapi 

load_dotenv()
openai_api_key = os.environ["OPENAI_API_KEY"]
mistral_api_key = os.environ["MISTRAL_API_KEY"]
serpapi_key = os.environ["SERPAPI_KEY"]

#%%
mistral = Mistral(api_key=mistral_api_key)
openai = OpenAI(api_key=openai_api_key)

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
  quality="hd",
  n=1,
  response_format="b64_json",
)

#%%
image_b64_json = response.data[0].b64_json


# Decode the base64 string
image_data = base64.b64decode(image_b64_json)

# Save to a JPG file
with open('output_image.jpg', 'wb') as file:
    file.write(image_data)

#%%

import requests
imgur_client_id = "0a4874f7449388e"

url = 'https://api.imgur.com/3/image'
headers = {
    'Authorization': f'Client-ID {imgur_client_id}'
}

files = {
    'image': ('output_image.jpg', open('output_image.jpg', 'rb')),
}

data = {
    'type': 'image',
    'title': 'Simple upload',
    'description': 'This is a simple image upload in Imgur'
}

response = requests.post(url, headers=headers, files=files, data=data)


print(response.json())
#%%

params = {
  "engine": "google_reverse_image",
  "image_url": response.json()['data']['link'] ,
  "api_key": serpapi_key
}

search = serpapi.search(params)
# results = search.get_dict()

print(search)

# %%
