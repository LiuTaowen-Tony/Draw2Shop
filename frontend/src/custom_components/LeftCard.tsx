import { useState } from 'react';
import Card from '@mui/material/Card'
import Canvas from 'src/custom_components/Canvas';
import DrawResults from './DrawResults'; // Adjust path as needed


async function fetchMistralAPI(api_key : string, image_url : string, user_input : string) {
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


// Component to use the callPixtral function
function CallPixtralComponent() {
  const [prompt, setPrompt] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [user_input, setUserInput] = useState("");

  const handleButtonClick = async () => {
    console.log("Button clicked!");
      await fetchMistralAPI("YdTk1TSU2SsI0eKVh6fAigo5Ug7oGPEM", image_url, user_input);
      setPrompt("Prompt generated successfully!");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter description"
        value={user_input}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter image URL"
        value={image_url}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleButtonClick}>Call Pixtral</button>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <p>{prompt}</p>
    </div>
  );
}


export default function LeftCard() {
  return (
    <Card>
      <CallPixtralComponent />
      <Canvas />
      <DrawResults /> {/* New Section */}
    </Card>
  )
};