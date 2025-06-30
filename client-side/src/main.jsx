import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import PlanetsPage from "./Components/Planets/PlanetsPage.jsx";
import NotFound from "./Components/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/planet/:id" element={<PlanetsPage />} />
        <Route path="*" element={<NotFound />} /> {/* Default route for undefined paths */}
      </Routes>
    </Router>
  </StrictMode>
);
