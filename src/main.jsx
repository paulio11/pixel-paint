import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/styles.css";
import { SettingsContextProvider } from "./contexts/SettingsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
  </StrictMode>
);
