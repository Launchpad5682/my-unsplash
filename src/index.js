import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ModalOverlayProvider } from "./context/ModalOverlayContext";

ReactDOM.render(
  <AuthProvider>
    <ModalOverlayProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ModalOverlayProvider>
  </AuthProvider>,
  document.getElementById("root")
);
