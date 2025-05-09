import React from "react";
import "./index.css";
import "./Assets/Styles/auth.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import '@fortawesome/fontawesome-free/css/all.min.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
