import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "./app/AppRouter";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento raíz de la aplicación.");
}

createRoot(rootElement).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);