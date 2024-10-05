#!/usr/bin/env python
# -*- coding: utf-8 -*-

from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

client = OpenAI()

response = client.images.generate(
  model="dall-e-3",
  prompt="Design an elegant, off-shoulder dress with an asymmetrical neckline and a draped, layered element over one shoulder. The dress has a fitted bodice, cinched at the waist with a sash tied into a bow. The skirt flows loosely with an irregular, wavy hemline, adding a dynamic and stylish silhouette. The overall look should be modern and sophisticated, showcasing an interplay of smooth lines and graceful curves. A super realistic image.",
  size="1024x1024",
  quality="standard",
  n=1,
)

print(response.data[0].url)

