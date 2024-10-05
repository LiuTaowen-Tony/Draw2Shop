import React, { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';

const DrawingCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = new Canvas('draw-canvas');
        canvasRef.current = canvas;

        // Enable drawing mode
        canvas.isDrawingMode = true;

        // Initialize the brush after enabling drawing mode
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = '#000000'; // Set brush color
            canvas.freeDrawingBrush.width = 5; // Set brush size
        } else {
            console.error("Failed to initialize freeDrawingBrush.");
        }

        // Cleanup function to avoid multiple canvas initialization
        return () => {
            canvas.dispose(); // Dispose of canvas when the component unmounts
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


