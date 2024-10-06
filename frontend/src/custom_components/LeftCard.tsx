import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card'
import Box from '@mui/material/Box';
import DrawResults from './DrawResults'; // Adjust path as needed
import { Drawing } from './Drawing';

type Props = {
  setUserDrawingB64: React.Dispatch<React.SetStateAction<string>>;
  setUserInput: (input: string) => void;
}



export default function LeftBox({ setUserDrawingB64, setUserInput }: Props) {
  return (
    <Box>
      <Card>
        <input type="text" placeholder="Enter description" onChange={(e) => setUserInput(e.target.value)} />
        <Drawing setUserDrawingB64={setUserDrawingB64} />
      </Card>
    </Box>
  )
};

      // {/* <Grid>
      // <Card>
      //   <DrawResults /> {/* New Section */}
      //   </Card>
      //   </Grid> */}