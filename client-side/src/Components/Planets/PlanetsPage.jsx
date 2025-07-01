import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function PlanetsPage() {
	const { id } = useParams();
	const [planet, setPlanet] = useState(null);
	const [characters, setCharacters] = useState([]);
	const [films, setFilms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const baseUrl = import.meta.env.VITE_BASE_API_URL;

	useEffect(() => {
		console.log("Base URL:", baseUrl);
		fetch(`${baseUrl}/api/planets/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setPlanet(data);
				fetchCharacters(id);
				fetchFilms(id);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching planet:", error);
				setError("Failed to fetch planet data");
				setLoading(false);
			});
	}, [id, baseUrl]);

	const fetchCharacters = (planetId) => {
		fetch(`${baseUrl}/api/planets/${planetId}/characters`)
			.then((response) => response.json())
			.then((data) => setCharacters(data))
			.catch((error) => console.error("Error fetching characters:", error));
	};

	const fetchFilms = (planetId) => {
		fetch(`${baseUrl}/api/planets/${planetId}/films`)
			.then((response) => response.json())
			.then((data) => setFilms(data))
			.catch((error) => console.error("Error fetching films:", error));
	};

	return (
		<div>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{planet && (
				<div>
					<h1>{planet.name}</h1>
					<div>
						{Object.entries(planet).map(([key, value]) => (
							<p key={key}>
								<strong>{key}:</strong> {value}
							</p>
						))}
					</div>
					<h2>Characters</h2>
					<ul>
						{characters.map((character) => (
							<li key={character.id}>
								<Link to={`/character/${character.id}`}>{character.name}</Link>
							</li>
						))}
					</ul>
					<h2>Films</h2>
					<ul>
						{films.map((film) => (
							<li key={film.id}>
								<Link to={`/film/${film.id}`}>{film.title}</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default PlanetsPage;
