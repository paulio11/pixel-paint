import React, { useEffect, useState } from "react";
import { useSettings } from "../contexts/SettingsContext";
import { isCanvasBlank } from "../utils/tools";

// Component to save the current canvas state
export const SaveImage = () => {
  const { pixels, blankCanvas, gridWidth, gridHeight } = useSettings();

  const handleSave = () => {
    const savedData = {
      pixels,
      gridWidth,
      gridHeight,
      timestamp: new Date().getTime(), // Add timestamp for uniqueness
    };

    const savedDataArray =
      JSON.parse(localStorage.getItem("savedDataArray")) || [];
    savedDataArray.push(savedData);

    const MAX_ENTRIES = 10; // Limit saved entries to 10
    if (savedDataArray.length > MAX_ENTRIES) savedDataArray.shift(); // Remove oldest entry

    localStorage.setItem("savedDataArray", JSON.stringify(savedDataArray)); // Save to localStorage
    window.dispatchEvent(new Event("localStorageUpdated")); // Notify other components
  };

  return (
    <button onClick={handleSave} disabled={isCanvasBlank(pixels, blankCanvas)}>
      Save
    </button>
  );
};

// Component to display and load saved images
export const SavedImages = () => {
  const [savedImages, setSavedImages] = useState([]);
  const { setPixels, setGridWidth, setGridHeight } = useSettings();

  // Fetch saved images from localStorage
  const updateSavedImages = () => {
    const localSavedImages =
      JSON.parse(localStorage.getItem("savedDataArray")) || [];
    setSavedImages(localSavedImages);
  };

  useEffect(() => {
    updateSavedImages();
    window.addEventListener("localStorageUpdated", updateSavedImages); // Listen for updates

    return () => {
      window.removeEventListener("localStorageUpdated", updateSavedImages); // Cleanup listener
    };
  }, []);

  // Load a saved image onto the canvas
  const loadImage = (image) => {
    const { pixels, gridWidth, gridHeight } = image;
    setGridWidth(gridWidth);
    setGridHeight(gridHeight);
    setTimeout(() => setPixels(pixels), 0); // Delay to ensure grid resizes first
  };

  return (
    <div className="saved-images-container">
      {savedImages.map((image, i) => (
        <div
          key={i}
          className="saved-image-grid"
          onClick={() => loadImage(image)}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${image.gridWidth}, 1px)`,
            gridTemplateRows: `repeat(${image.gridHeight}, 1px)`,
          }}
        >
          {image.pixels.map((color, j) => (
            <div
              key={j}
              className="saved-image-pixel"
              style={{ width: "1px", height: "1px", backgroundColor: color }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};
