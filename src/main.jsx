import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from ReactDOM
import App from "./App";
// import "./styles/index.css"; // Import global styles if any

// Get the root element
const rootElement = document.getElementById("root");

// Create the root and render the App
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
