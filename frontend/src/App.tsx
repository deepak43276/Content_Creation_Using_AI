import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContentPage from "./pages/content";
import OutputPage from "./pages/output";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
