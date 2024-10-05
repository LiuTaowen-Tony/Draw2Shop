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

    // Function to download the canvas content as an image
    const handleDownload = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1.0
        });

        // Create a temporary anchor element and trigger download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'drawing.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h1>Draw to Shop</h1>
            <canvas id="draw-canvas" width="500" height="500" style={{ border: "2px solid #000 !important" }} />
            <br />
            <button onClick={handleDownload}>Download</button>
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


