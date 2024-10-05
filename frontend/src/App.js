import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const DrawingCanvas = () => {
    const canvasRef = useRef(null);

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
        setInterval(() => {
            const drawingDataURL = canvas.toDataURL(); // Get the image URL from the canvas
            console.log('Canvas updated:', drawingDataURL);
        }, 2000);

        // Cleanup: dispose of the canvas when the component unmounts
        return () => {
            canvas.dispose();
        };
    }, []);

    return (
        <div>
            <h1>Draw to Shop</h1>
            <canvas id="draw-canvas" width="500" height="500" style={{ border: "1px solid #000" }} />
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <DrawingCanvas />
        </div>
    );
}

export default App;