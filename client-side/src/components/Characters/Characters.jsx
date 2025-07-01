import { useEffect, useState } from "react";
import Character from "./Character";

const Characters = ({ charName }) => {
	const [characters, setCharacters] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		setErrorMessage("");
		fetch(`${import.meta.env.VITE_BASE_API_URL}/characters?name=${charName}`)
			.then((res) => res.json())
			.then((data) => {
				setCharacters(data);
				setIsLoading(false);
				setIsError(false);
			})
			.catch((error) => {
				setIsError(true);
				setErrorMessage(error.message);
			});
	}, [charName]);

	if (isLoading) {
		return (
			<>
				<div className="text-center">
					<span className="loading loading-dots loading-xl text-success mt-5"></span>
				</div>
			</>
		);
	}
	if (isError) {
		return (
			<div className="w-1/2 mx-auto">
				<div role="alert" className="alert alert-error flex justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 shrink-0 stroke-current text-white"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span className="font-semibold text-xl text-white">
						{errorMessage ? errorMessage : "Something went wrong"}
					</span>
				</div>
			</div>
		);
	}

	return (
		<>
			{characters.length === 0 && charName !== "" && (
				<h1 className="text-2xl font-bold text-center mt-3 text-red-500">
					Couldn’t find a star character called '{charName}'.
				</h1>
			)}
			<div className="flex flex-wrap gap-6 max-w-10/12 mx-auto mt-4 mb-6">
				{characters.map((char) => (
					<Character key={char._id} character={char}></Character>
				))}
			</div>
		</>
	);
};

export default Characters;
