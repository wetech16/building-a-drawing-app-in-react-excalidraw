import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import "./App.css";

const generator = rough.generator();
const createElement = (x1, y1, x2, y2) => {
  // const roughtElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  const roughtElement = generator.line(x1, y1, x2, y2);
  return { x1, y1, x2, y2, roughtElement };
};

function App() {
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughtElement }) =>
      roughCanvas.draw(roughtElement)
    );
  }, [elements]);

  const handleMouseDown = (event) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prevState) => [...prevState, element]);
  };
  const handleMouseMove = (event) => {
    if (!drawing) return;
    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updateElement = createElement(x1, y1, clientX, clientY);
    const elementsCopy = [...elements];
    elementsCopy[index] = updateElement;
    setElements(elementsCopy);
  };
  const handleMouseUp = () => {
    setDrawing(false);
  };
  return (
    <canvas
      id="canvas"
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

export default App;
