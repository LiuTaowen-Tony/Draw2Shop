import { useState } from 'react';
import Card from '@mui/material/Card'
import Canvas from 'src/custom_components/Canvas';
import Box from '@mui/material/Box';



// // Component to use the callPixtral function
// function CallPixtralComponent() {
//   const [prompt, setPrompt] = useState("");
//   const [image_url, setImageUrl] = useState("");
//   const [user_input, setUserInput] = useState("");

//   const handleButtonClick = async () => {
//     console.log("Button clicked!");
//       await fetchMistralAPI("YdTk1TSU2SsI0eKVh6fAigo5Ug7oGPEM", image_url, user_input);
//       setPrompt("Prompt generated successfully!");
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter description"
//         value={user_input}
//         onChange={(e) => setUserInput(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter image URL"
//         value={image_url}
//         onChange={(e) => setImageUrl(e.target.value)}
//       />
//       <button onClick={handleButtonClick}>Call Pixtral</button>
//       {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
//       <p>{prompt}</p>
//     </div>
//   );
// }


export default function LeftCard() {
  const [userInput, setUserInput] = useState("");
  const [drawingDescription, setDrawingDescription] = useState("");
  // text input 


  return (
    <Card>
      <input type="text" placeholder="Enter description" value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
      <Box>
        <p>{drawingDescription}</p>
      </Box>
      <Canvas setDrawingDescription={setDrawingDescription} api_key={"YdTk1TSU2SsI0eKVh6fAigo5Ug7oGPEM"} user_input={userInput}/>
    </Card>
  )
};