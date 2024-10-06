// @ts-ignore
import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';



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


export default function Canvas({setDrawingDescription, api_key, user_input}) {
  const canvasRef = useRef(null);
  const [image_b64, setImage_b64] = React.useState("");

  useEffect(() => {
      // Create the fabric.js canvas
      const canvas = new fabric.Canvas('draw-canvas');
      canvasRef.current = canvas;

      // Enable drawing mode
      canvas.isDrawingMode = true;

      // Set up brush properties
      canvas.freeDrawingBrush.color = '#000000'; // Black brush color
      canvas.freeDrawingBrush.width = 5; // Brush size

      // Log the canvas data every 2 seconds (this can be used to send data to the backend)
      setInterval(async () => {
          const drawingDataURL = canvas.toDataURL(); // Get the image URL from the canvas
          setImage_b64(drawingDataURL);
          const drawingDescription = await fetchMistralAPI(api_key, drawingDataURL, user_input);
          console.log(drawingDescription);
          setDrawingDescription(drawingDescription);
      }, 10000);

      // Cleanup: dispose of the canvas when the component unmounts
      return () => {
          canvas.dispose();
      };
  }, []);

//   // Function to download the canvas content as an image
//   const handleDownload = () => {
//       const canvas = canvasRef.current;
//       const dataURL = canvas.toDataURL({
//           format: 'png',
//           quality: 1.0
//       });

//       // Create a temporary anchor element and trigger download
//       const link = document.createElement('a');
//       link.href = dataURL;
//       link.download = 'drawing.png';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//   };

  return (
      <div>
          <h1>Draw to Shop</h1>
          <canvas id="draw-canvas" width="500" height="500" style={{ border: "2px solid #000 !important" }} />
          <br />
      </div>
  );
};