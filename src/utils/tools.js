import html2canvas from "html2canvas";

// Flood fill algorithm to fill connected pixels with a new color
export const floodFill = (
  startIndex,
  selectedColor,
  gridWidth,
  gridHeight,
  pixels,
  setPixels
) => {
  const targetColor = pixels[startIndex];
  if (targetColor === selectedColor) return; // Exit if target color matches selected color

  const newPixels = [...pixels]; // Copy pixels to avoid mutation
  const queue = [startIndex]; // Queue for BFS
  const visited = new Set([startIndex]); // Track visited pixels

  while (queue.length > 0) {
    const currentIndex = queue.shift();
    if (newPixels[currentIndex] !== targetColor) continue; // Skip non-matching colors

    newPixels[currentIndex] = selectedColor; // Fill current pixel
    const row = Math.floor(currentIndex / gridWidth);
    const col = currentIndex % gridWidth;

    // Check neighboring pixels (left, right, up, down)
    const neighbors = [
      { row, col: col - 1 }, // Left
      { row, col: col + 1 }, // Right
      { row: row - 1, col }, // Up
      { row: row + 1, col }, // Down
    ];

    neighbors.forEach(({ row: newRow, col: newCol }) => {
      if (
        newRow < 0 ||
        newRow >= gridHeight ||
        newCol < 0 ||
        newCol >= gridWidth
      )
        return; // Skip out-of-bounds

      const neighborIndex = newRow * gridWidth + newCol;
      if (
        !visited.has(neighborIndex) &&
        newPixels[neighborIndex] === targetColor
      ) {
        visited.add(neighborIndex);
        queue.push(neighborIndex); // Add valid neighbors to queue
      }
    });
  }

  setPixels(newPixels); // Update pixel state
};

// Paint or erase pixels based on tool and size
export const paintOrErase = (
  i,
  selectedTool,
  setPixels,
  pixels,
  selectedColor,
  gridWidth,
  gridHeight,
  toolSize
) => {
  const newPixels = [...pixels]; // Copy pixels to avoid mutation
  const color = selectedTool === "eraser" ? "#ffffff" : selectedColor; // Set color based on tool
  const row = Math.floor(i / gridWidth);
  const col = i % gridWidth;
  const radius = Math.floor(toolSize / 2); // Calculate tool radius

  // Apply tool to surrounding pixels
  for (let dx = -radius; dx < toolSize - radius; dx++) {
    for (let dy = -radius; dy < toolSize - radius; dy++) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < gridHeight &&
        newCol >= 0 &&
        newCol < gridWidth
      ) {
        const newIndex = newRow * gridWidth + newCol;
        newPixels[newIndex] = color; // Update pixel color
      }
    }
  }

  setPixels(newPixels); // Update pixel state
};

// Download the grid as a PNG image
export const downloadAsImage = () => {
  const gridElement = document.getElementById("grid");
  if (gridElement) {
    html2canvas(gridElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); // Convert canvas to image
      link.download = "my-art.png"; // Set download filename
      link.click(); // Trigger download
    });
  }
};

// Check if two pixel arrays are identical (blank canvas check)
export const isCanvasBlank = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false; // Different lengths mean not identical
  return arr1.every((value, index) => value === arr2[index]); // Compare each pixel
};
