import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
