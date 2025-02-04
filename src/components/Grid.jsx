import React, { useEffect, useState } from "react";
import { useSettings } from "../contexts/SettingsContext";
import { floodFill, paintOrErase } from "../utils/tools";

const Grid = () => {
  const {
    gridWidth,
    gridHeight,
    pixels,
    setPixels,
    showGridLines,
    setShowGridLines,
    selectedTool,
    selectedColor,
    zoom,
    toolSize,
  } = useSettings();
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixelSize, setPixelSize] = useState("20px");

  // Update pixel size based on zoom level
  useEffect(() => {
    const baseSize = 2;
    const step = 2;
    const maxZoom = 20;
    const sizes = Array.from(
      { length: maxZoom },
      (_, i) => `${baseSize + i * step}px`
    );
    setPixelSize(sizes[zoom - 1] || `${baseSize}px`);
    if (zoom <= 5) setShowGridLines(false); // Hide grid lines at low zoom levels
  }, [zoom]);

  // Reset pixels when grid dimensions change
  useEffect(() => {
    setPixels(new Array(gridWidth * gridHeight).fill("#ffffff"));
  }, [gridWidth, gridHeight, setPixels]);

  // Handle mouse down events (click or drag start)
  const handleMouseDown = (i) => {
    if (selectedTool === "fill") {
      floodFill(i, selectedColor, gridWidth, gridHeight, pixels, setPixels);
    } else {
      paintOrErase(
        i,
        selectedTool,
        setPixels,
        pixels,
        selectedColor,
        gridWidth,
        gridHeight,
        toolSize
      );
    }
  };

  return (
    <div
      id="grid"
      onMouseDown={() => setIsDrawing(true)}
      onMouseUp={() => setIsDrawing(false)}
      onMouseLeave={() => setIsDrawing(false)}
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${gridWidth}, ${pixelSize})`,
        gridTemplateRows: `repeat(${gridHeight}, ${pixelSize})`,
        borderBottom: showGridLines ? "1px solid #ddd" : "none",
        borderLeft: showGridLines ? "1px solid #ddd" : "none",
      }}
    >
      {pixels.map((color, i) => (
        <div
          key={i}
          onMouseDown={() => handleMouseDown(i)}
          onMouseEnter={() =>
            isDrawing &&
            selectedTool !== "fill" &&
            paintOrErase(
              i,
              selectedTool,
              setPixels,
              pixels,
              selectedColor,
              gridWidth,
              gridHeight,
              toolSize
            )
          }
          className="pixel"
          style={{
            width: `${pixelSize}`,
            height: `${pixelSize}`,
            backgroundColor: color,
            borderTop: showGridLines ? "1px solid #ddd" : "none",
            borderRight: showGridLines ? "1px solid #ddd" : "none",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
