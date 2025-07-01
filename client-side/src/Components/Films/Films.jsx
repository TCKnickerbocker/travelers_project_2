import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Films = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filmData, setFilmData] = useState({});
  const [filmCharacterData, setFilmCharacterData] = useState([]);
  const [filmPlanetsData, setFilmPlanetsData] = useState([]);

  id = parseInt(id);

  useEffect(() => {
    if (isNaN(id)) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage("Invalid film ID!");
    } else {
      const fetchedFilmData = fetch(
        `${import.meta.env.VITE_BASE_API_URL}/films/${id}`
      );
      const fetchedCharData = fetch(
        `${import.meta.env.VITE_BASE_API_URL}/films/${id}/characters`
      );
      const fetchedPlanetData = fetch(
        `${import.meta.env.VITE_BASE_API_URL}/films/${id}/planets`
      );
      // setIsError(false);
      const loadData = async () => {
        try {
          setIsLoading(true);
          setIsError(false);
          setErrorMessage("");
          const [filmDataRes, charDataRes, planetDataRs] = await Promise.all([
            fetchedFilmData,
            fetchedCharData,
            fetchedPlanetData,
          ]);
          const [data, charData, planetData] = await Promise.all([
            filmDataRes.json(),
            charDataRes.json(),
            planetDataRs.json(),
          ]);
          setFilmData(data);
          setFilmCharacterData(charData);
          setFilmPlanetsData(planetData);

          setIsLoading(false);
          setIsError(false);
          setErrorMessage("");
        } catch (error) {
          console.log(error);
          setIsError(true);
          setErrorMessage(error?.message);
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, []);

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
  if (filmData === null) {
    return (
      <>
        <div className="w-1/2 mx-auto">
          <div role="alert" className="alert alert-error flex justify-center">
            <span className="font-semibold text-xl text-white">
              Invalid film ID.
            </span>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="max-w-11/12 mx-auto py-15">
        <div>
          <h1 className="text-7xl text-white font-semibold">
            {filmData?.title}
          </h1>
          <div className="card lg:card-side bg-yellow-300 shadow-sm mt-10 max-w-10/12 mx-auto py-5 px-2 border-2 border-gray-300">
            <div className="card-body">
              <p className="font-semibold text-xl text-blue-600">
                {filmData?.opening_crawl}
              </p>
            </div>
          </div>
          <div className="flex justify-around my-20 text-2xl font-bold text-blue-600 mx-10">
            <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl">
              Released: {filmData?.release_date}
            </h3>
            <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl">
              Director: {filmData?.director}
            </h3>
            <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl">
              Episode: {filmData?.episode_id}
            </h3>
          </div>
        </div>
        <div className="max-w-11/12">
          <h1 className="text-6xl text-white font-semibold">
            Appearing Characters
          </h1>
          {filmCharacterData.length === 0 ? (
            <h1 className="text-3xl text-center my-20 text-white font-bold">
              No characters found for the film {filmData?.title}
            </h1>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 my-20 text-2xl font-bold text-blue-600 ms-[110px]">
              {filmCharacterData.map((character) => (
                <Link
                  to={`/character/${character?.character_id}`}
                  key={character._id}
                >
                  <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl text-center">
                    {character?.characterData?.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="max-w-11/12">
          <h1 className="text-6xl text-white font-semibold">Planets</h1>
          {filmPlanetsData.length === 0 ? (
            <h1 className="text-3xl text-center my-20 text-white font-bold">
              No planets found for the film {filmData?.title}
            </h1>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 my-20 text-2xl font-bold text-blue-600 ms-[110px]">
              {filmPlanetsData.map((planet) => (
                <Link to={`/planet/${planet?.planet_id}`} key={planet._id}>
                  <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl text-center">
                    {planet?.planetData?.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Films;
