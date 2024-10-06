import fs from 'fs';
import path from 'path';

import { useState } from "react";
import LeftBox from "src/custom_components/LeftCard";
import Grid from '@mui/material/Unstable_Grid2';
import RightCard from "src/custom_components/RightCard";
import Box from '@mui/material/Box'



async function fetchMistral(api_key: string, image_url: string, user_input: string) {
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
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching completion:", error);
  }
}

async function fetchOpenAI(api_key: string, prompt: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024'
        // response_format: "b64_json"
      })
    });


    if (!response.ok) {
      console.log(response)
      throw new Error(`Error: ${response.status} ${response.statusText} ${response}`);
    }

    const data = await response.json();
    return data.data[0].url;
  }
  catch (error) {
    console.error("Error openai fetching completion:", error);
  }
}


function generateRandomFileName(extension: string = 'png'): string {
  const randomName = `image_${Math.random().toString(36).substring(2, 15)}`;
  return `${randomName}.${extension}`;
}
// async function uploadImgur(api_key: string, imageBase64: string) {

//   try {
//     // Convert the base64 string to a Blob
//     const byteCharacters = atob(imageBase64);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//       const slice = byteCharacters.slice(offset, offset + 512);
//       const byteNumbers = new Array(slice.length);

//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }

//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }

//     const imageBlob = new Blob(byteArrays, { type: 'image/png' });
//     const randomFileName = `image_${Math.random().toString(36).substring(2, 15)}.png`;

//     // Create a FormData instance and append the Blob
//     const formData = new FormData();
//     formData.append('image', imageBlob, randomFileName); // Provide a random file name
//     formData.append('type', 'file'); // Specify that we're uploading a file
//     formData.append('title', 'Random upload');
//     formData.append('description', 'This is a random image upload in Imgur');

//     // Make the POST request to Imgur
//     const response = await fetch('https://api.imgur.com/3/image', {
//       method: 'POST',
//       headers: { 'Authorization': `Client-ID ${api_key}` },
//       body: formData,
//     });

//     if (!response.ok) {
//       console.log(response)
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error during Imgur upload:', error);
//   }
// }

async function visualSearch(api_key: string, image_url: string) {
  // const imageUrl = "https://contoso.com/path/image.jpg";

  // Create a FormData object
  const formData = new FormData();
  formData.append('knowledgeRequest', JSON.stringify({
      imageInfo: {
          url: image_url
      }
  }));
  
  try {
  const response = await fetch('https://api.bing.microsoft.com/v7.0/images/visualsearch?mkt=en-us', {
      method: 'POST',
      headers: {
          'Ocp-Apim-Subscription-Key': api_key
      },
      body: formData // Pass FormData as the body
  })


    if (!response.ok) {
      console.log(response);
      throw new Error(`Error: ${response.status} ${response.statusText} ${response}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching completion:", error);
  }
}


// async function visualSearch(api_key: string, image_url: string) {
//   const searchUrl = 'https://api.bing.microsoft.com/v7.0/images/visualsearch';

//   // Request body with the image URL
//   const requestBody = {
//       knowledgeRequest: JSON.stringify({
//           imageInfo: {
//               url: image_url
//           }
//       })
//   };

//   // Headers for the request
//   const headers = {
//       'Ocp-Apim-Subscription-Key': api_key
//   };

//   try {
//       // Sending the POST request
//       const response = await fetch(searchUrl, {
//           method: 'POST',
//           headers: headers,
//           : JSON.stringify(requestBody),
//           params: {
//               mkt: 'en-us'
//           }
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }
//       return response.json();
//   } catch (error) {
//       console.error('Error occurred:', error);
//   }
// }


async function generateImprovedSketch(api_keys, input_drawing: string, user_input: string) {
  var image_urls = [];
  const caption = await fetchMistral(api_keys.mistral, input_drawing, user_input);
  console.log(caption);
  for (var i = 0; i != 1; i++){
    const prompt = caption + "A super realistic image of the clothes."
    const image_url = await fetchOpenAI(api_keys.openai, prompt);
    console.log(image_url);
    // const image_url = await uploadImgur(api_keys.imgur, improvedDrawingB64);
    console.log(image_url);
    image_urls.push(image_url);
  }

  return image_urls;
}




export default function MainPage() {
  // const [leftCardState, updateLeftCardState];
  const api_keys = {

  }
  const [userDrawingB64, setUserDrawingB64] = useState("");
  const [userInput, setUserInput] = useState("");
  const [refinedImageURLs, setRefinedImageURLs] = useState([]);
  const [refinedImageSelection, setRefinedImageSelection] = useState(0); // can be 0, 1, or 2
  const [resultImageURLs, setResultImageURLs] = useState([]);
  const [oldUserInput, setOldUserInput] = useState("");
  const [oldUserDrawingB64, setOldUserDrawingB64] = useState("");
  async function updatePage() {
    if (userInput == oldUserInput && userDrawingB64 == oldUserDrawingB64) {
      return
    }
    setOldUserInput(userInput);
    setOldUserDrawingB64(userDrawingB64);
    const image_urls = await generateImprovedSketch(api_keys, userDrawingB64, userInput);
    setRefinedImageURLs(image_urls);
    console.log(image_urls);
    setRefinedImageSelection(0);
    const microsoftResult = await visualSearch(api_keys.microsoft, image_urls[0]);
    console.log(microsoftResult);
  }

  // setInterval(
  //   updatePage, 10000
  // );


  // add some top and below spacing

  return (
    <>
    <button onClick={updatePage}>Update</button>
    <Box sx={{ p: 2, border: '1px' }}>
      <Grid container spacing={2}>
        <Grid key={"left"} xs={12} sm={12} md={6}>
          <LeftBox setUserDrawingB64={setUserDrawingB64} setUserInput={setUserInput} />
        </Grid>
        <Grid key={"right"} xs={12} sm={12} md={6}>
          <RightCard />
        </Grid>
      </Grid>
    </Box>
    </>
  )
};