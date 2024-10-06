import Canvas from "./Canvas";
import { useState } from "react";
import Fab from "@mui/material/Fab"
import { Iconify } from 'src/components/iconify';

export function Drawing({ setUserDrawingB64 }: { setUserDrawingB64: React.Dispatch<React.SetStateAction<string>> }) {
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(5);
  const [isPen, setIsPen] = useState<boolean>(true);

  function flipIsPen() {
    setIsPen((prevIsPen) => {
      const newIsPen = !prevIsPen;
      if (newIsPen) {
        // Switch to pen
        setBrushColor("#000000");
        setBrushSize(5);
      } else {
        // Switch to eraser
        setBrushColor("#ffffff");
        setBrushSize(20);
      }
      return newIsPen;
    });
  }

  const penEraserButton = (
    <Fab
      size="medium"
      aria-label={isPen ? "Switch to Eraser" : "Switch to Pen"}
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'absolute', // Position the button relative to the canvas container
        bgcolor:'grey.800' ,
        color: 'common.white',
      }}
      onClick={flipIsPen}
    >
      <Iconify width={24} icon={isPen ? "mdi:pen" : "mdi:eraser"} />
    </Fab>
  );

  return (
    <div className="flex flex-col items-center justify-center" style={{ position: 'relative' }}>
      <Canvas brushColor={brushColor} brushSize={brushSize} setUserDrawingB64={setUserDrawingB64} />
      {penEraserButton}
    </div>
  );
}
