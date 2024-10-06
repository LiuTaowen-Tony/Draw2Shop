import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card'
import Box from '@mui/material/Box';
import DrawResults from './RefinedDrawingList'; // Adjust path as needed
import { Drawing } from './Drawing';
import Fab from '@mui/material/Fab';
import { OutlinedInput } from '@mui/material';

type Props = {
  setUserDrawingB64: React.Dispatch<React.SetStateAction<string>>;
  setUserInput: (input: string) => void;
  refinedImageURLs: string[];
}


export default function LeftBox({ setUserDrawingB64, setUserInput, refinedImageURLs } : Props) {
  const FabInput = (
    <Fab 
      variant="extended"
      sx={{
        position: 'absolute', // Allows the Fab to float over the canvas
        top: '50px', // Positions it from the top
        left: '50%', // Centers horizontally
        transform: 'translateX(-50%)', // Centers the Fab horizontally
        zIndex: 1000, // Ensures it floats over other elements
        width: '80%', // Adjusts the width to make it long
        maxWidth: '600px', // Sets a maximum width to prevent it from getting too large
      }}
    >
      <OutlinedInput 
        size="small" 
        placeholder="I want a green long sleeve T-shirt" 
        onChange={(e) => setUserInput(e.target.value)} 
        sx={{ 
          width: '100%', // Makes the input take the full width of the Fab
        }}
      />
      </Fab>
  );

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}> {/* Enables absolute positioning inside this box */}
      <Card>
        {FabInput}
        <Drawing setUserDrawingB64={setUserDrawingB64} />
      </Card>
      <DrawResults refinedImageURLs={refinedImageURLs} />
    </Box>
  );
};

      // {/* <Grid>
      // <Card>
      //   <DrawResults /> {/* New Section */}
      //   </Card>
      //   </Grid> */}