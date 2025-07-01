import { useState } from "react";
import "./App.css";
import Characters from "./components/Characters/Characters";

function App() {
	const [charName, setCharName] = useState("");
	return (
		<>
			<div className="max-w-11/12 mx-auto">
				<h1 className="text-4xl font-bold text-center my-3">
					Star Wars Universe Lookup
				</h1>
				<div className="w-1/3 mx-auto">
					<p className="text-2xl font-bold mb-3 text-center">
						Who you looking for?
					</p>
					<input
						type="text"
						placeholder="Type here your favorite Star Wars character's name"
						className="input input-primary w-full"
						id="charactername"
						name="name"
						onChange={(e) => setCharName(e.target.value)}
					/>
				</div>
				<div className="divider divider-start divider-primary"></div>
				<Characters charName={charName}></Characters>
			</div>
		</>
	);
}

export default App;
