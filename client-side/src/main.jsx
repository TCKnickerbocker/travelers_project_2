import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>
  </StrictMode>
);
