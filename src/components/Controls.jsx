import React, { useRef } from "react";
import { useSettings } from "../contexts/SettingsContext";
import { downloadAsImage, isCanvasBlank } from "../utils/tools";
import { SaveImage } from "./SavedImages";

const Controls = () => {
  const {
    selectedColor,
    setSelectedColor,
    selectedTool,
    setSelectedTool,
    pixels,
    blankCanvas,
    gridWidth,
    gridHeight,
    showGridLines,
    setGridHeight,
    setGridWidth,
    setZoom,
    zoom,
    setShowGridLines,
    toolSize,
    setToolSize,
    setPixels,
  } = useSettings();
  const colorInput = useRef();
  const isDisabled = isCanvasBlank(pixels, blankCanvas);

  return (
    <div>
      {/* Top button group: New, Save, Download */}
      <div className="side-button-group">
        <button onClick={() => setPixels(blankCanvas)} disabled={isDisabled}>
          New
        </button>
        <SaveImage />
        <button onClick={downloadAsImage} disabled={isDisabled}>
          Download
        </button>
      </div>

      {/* Middle button group: Color picker, tool size, and tools */}
      <div className="side-button-group">
        <div className="input-and-label">
          <label htmlFor="color" onClick={() => colorInput.current.click()}>
            Color
          </label>
          <input
            ref={colorInput}
            type="color"
            className="color-input"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </div>

        <div className="input-and-label">
          <label
            htmlFor="size"
            className={selectedTool === "fill" ? "disabled-slider-label" : ""}
          >
            Size
          </label>
          <input
            disabled={selectedTool === "fill"}
            className={`tool-slider ${
              selectedTool === "fill" ? "disabled-slider" : ""
            }`}
            type="range"
            min="1"
            max="5"
            value={toolSize}
            onChange={(e) => setToolSize(+e.target.value)}
          />
        </div>

        <button
          className={
            selectedTool === "brush" ? "selected-tool" : "inactive-tool"
          }
          onClick={() => setSelectedTool("brush")}
        >
          Paint
        </button>
        <button
          className={
            selectedTool === "eraser" ? "selected-tool" : "inactive-tool"
          }
          onClick={() => setSelectedTool("eraser")}
        >
          Erase
        </button>
        <button
          className={
            selectedTool === "fill" ? "selected-tool" : "inactive-tool"
          }
          onClick={() => setSelectedTool("fill")}
        >
          Fill
        </button>
      </div>

      {/* Bottom button group: Grid toggle, grid size, and zoom */}
      <div className="side-button-group">
        <button
          onClick={() => setShowGridLines(!showGridLines)}
          className={showGridLines ? "selected-tool" : "inactive-tool"}
        >
          Grid
        </button>

        {isCanvasBlank(pixels, blankCanvas) && (
          <>
            <div className="input-and-label">
              <label htmlFor="grid-width">Width</label>
              <input
                className="grid-size-input"
                type="number"
                value={gridWidth}
                onChange={(e) => setGridWidth(+e.target.value)}
                min={8}
                max={128}
              />
            </div>
            <div className="input-and-label">
              <label htmlFor="grid-height">Height</label>
              <input
                className="grid-size-input"
                type="number"
                value={gridHeight}
                onChange={(e) => setGridHeight(+e.target.value)}
                min={8}
                max={128}
              />
            </div>
          </>
        )}

        <div className="input-and-label">
          <label htmlFor="zoom">Zoom</label>
          <input
            className="tool-slider"
            type="range"
            min="1"
            max="20"
            value={zoom}
            onChange={(e) => setZoom(+e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
