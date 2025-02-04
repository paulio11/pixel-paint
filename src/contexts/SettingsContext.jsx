import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

// Provider component to manage app settings and state
export const SettingsContextProvider = ({ children }) => {
  const [gridWidth, setGridWidth] = useState(32); // Default grid width
  const [gridHeight, setGridHeight] = useState(32); // Default grid height
  const blankCanvas = Array(gridWidth * gridHeight).fill("#ffffff"); // Initialize blank canvas
  const [pixels, setPixels] = useState(blankCanvas); // Pixel state
  const [showGridLines, setShowGridLines] = useState(false); // Toggle grid lines
  const [selectedColor, setSelectedColor] = useState("#53ea9c"); // Selected color
  const [selectedTool, setSelectedTool] = useState("brush"); // Selected tool
  const [zoom, setZoom] = useState(10); // Zoom level
  const [toolSize, setToolSize] = useState(1); // Tool size

  return (
    <SettingsContext.Provider
      value={{
        blankCanvas,
        pixels,
        setPixels,
        showGridLines,
        setShowGridLines,
        gridWidth,
        setGridWidth,
        gridHeight,
        setGridHeight,
        selectedColor,
        setSelectedColor,
        selectedTool,
        setSelectedTool,
        zoom,
        setZoom,
        toolSize,
        setToolSize,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to access settings context
export const useSettings = () => useContext(SettingsContext);
