import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.jsx";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails.jsx";
import Films from "./components/Films/Films.jsx";
import NotFound from "./components/NotFound.jsx";
import PlanetsPage from "./Components/Planets/PlanetsPage.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Router>
			<Routes>
				<Route exact path="/" element={<App />} />
				<Route path="/character/:id" element={<CharacterDetails />} />
				<Route path="/film/:id" element={<Films />} />
				<Route path="/planet/:id" element={<PlanetsPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	</StrictMode>
);
