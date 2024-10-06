import { useState } from "react";
import LeftBox from "src/custom_components/LeftCard";
import Grid from '@mui/material/Unstable_Grid2';
import RightCard from "src/custom_components/RightCard";
import Box from '@mui/material/Box'



async function fetchMistralAPI(api_key: string, image_url: string, user_input: string) {
  // const apiKey = process.env.MISTRAL_API_KEY; // Store your API key securely, e.g., in environment variables

  const url = "https://api.mistral.ai/v1/chat/completions";
  const model_name = "pixtral-12b-2409";
  const prompt = `Please generate a detailed fashion design description based on the input picture and this information: ${user_input}. 
  Tailor the description to the specific type of garment (e.g., t-shirt, jacket, coat, dress, skirt) 
  and focus on the most relevant features for that garment. Include details such as:

  - Collar type (e.g., round, V-neck, mandarin, or other styles)
  - Sleeve design and length (e.g., short, long, sleeveless)
  - Hemline style and overall garment length (e.g., waist-length, knee-length, ankle-length)
  - Fit (e.g., loose, slim, tailored)
  - Notable design elements (e.g., buttons, zippers, pockets, patterns, logos, or embellishments)
  - Fabric texture, material (e.g., cotton, wool, polyester), and color.

  Ensure that the description accurately reflects all visible design elements from the sketch and provides a clear understanding of the garment's aesthetic and functional aspects.`;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${api_key}`
  };

  const body = {
    model: model_name,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt
          },
          {
            type: "image_url",
            image_url: image_url
          }
        ]
      }
    ],
    max_tokens: 300
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText} ${response}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching completion:", error);
  }
}


export default function MainPage() {
  // const [leftCardState, updateLeftCardState];
  const api_keys = {
    "mistral": "",
    "openai": "",
    "serpapi": ""
  }
  const [userDrawingB64, setUserDrawingB64] = useState("");
  const [userInput, setUserInput] = useState("");
  const [refinedImageURLs, setRefinedImageURLs] = useState([]);
  const [resultImageURLs, setResultImageURLs] = useState([]);


  // add some top and below spacing

  return (
    <Box sx={{ p: 2, border: '1px' }}>
      <Grid container spacing={2}>
        <Grid key={"left"} xs={12} sm={12} md={6}>
          <LeftBox setUserDrawingB64={setUserDrawingB64} setUserInput={setUserInput}/>
        </Grid>
        <Grid key={"right"} xs={12} sm={12} md={6}>
          <RightCard />
        </Grid>
      </Grid>
    </Box>
  )
};