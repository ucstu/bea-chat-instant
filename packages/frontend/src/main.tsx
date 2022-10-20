import React from "react";
import ReactDOM from "react-dom/client";
import { client } from "./apis";
import App from "./App";
import "./main.scss";

client.default.httpRequest.config.BASE = import.meta.env.VITE_BASE_URL;
client.service.httpRequest.config.BASE = import.meta.env.VITE_BASE_URL;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
