// @ts-ignore
import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';


type Props = {
 setUserDrawingB64: React.Dispatch<React.SetStateAction<string>>;
  brushSize: number;
  brushColor: string;
}

export default function Canvas({ setUserDrawingB64, brushSize, brushColor }: Props) {
    const canvasRef = useRef<fabric.Canvas | null>(null);
  
    useEffect(() => {
      // Create the fabric.js canvas
      const canvas = new fabric.Canvas('draw-canvas');
      canvasRef.current = canvas;
  
      // Enable drawing mode
      canvas.isDrawingMode = true;
  
      // Set up initial brush properties
      canvas.freeDrawingBrush.color = brushColor;
      canvas.freeDrawingBrush.width = brushSize;
  
      async function handleDrawing() {
        const drawingDataURL = canvas.toDataURL(); // Get the image URL from the canvas
        setUserDrawingB64(drawingDataURL);
      }
  
      const intervalId = setInterval(handleDrawing, 2000);
  
      // Cleanup: dispose of the canvas when the component unmounts
      return () => {
        clearInterval(intervalId);
        canvas.dispose();
      };
    }, []); // Run on mount and unmount for cleanup
  
    useEffect(() => {
      // Update brush properties whenever brushSize or brushColor changes
      if (canvasRef.current) {
        canvasRef.current.freeDrawingBrush.color = brushColor;
        canvasRef.current.freeDrawingBrush.width = brushSize;
      }
    }, [brushSize, brushColor]); // Dependencies to detect changes
  
    return <canvas id="draw-canvas" width={500} height={500} />;
  }
