import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { App as AntdAppContext } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdAppContext>
      <App />
    </AntdAppContext>
  </StrictMode>
);
