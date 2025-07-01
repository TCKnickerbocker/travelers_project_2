import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CharacterDetails = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [characterData, setCharacterData] = useState({});
  const [characterFilmsData, setCharacterFilmsData] = useState([]);

  id = parseInt(id);

  useEffect(() => {
    if (isNaN(id)) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage("Invalid character ID!");
    } else {
      const fetchedCharData = fetch(
        `${import.meta.env.VITE_BASE_API_URL}/characters/${id}`
      );
      const fetchedFilmData = fetch(
        `${import.meta.env.VITE_BASE_API_URL}/characters/${id}/films`
      );
      // setIsError(false);
      const loadData = async () => {
        try {
          setIsLoading(true);
          setIsError(false);
          setErrorMessage("");
          const [charDataRes, filmsDataRes] = await Promise.all([
            fetchedCharData,
            fetchedFilmData,
          ]);
          const [charData, filmsData] = await Promise.all([
            charDataRes.json(),
            filmsDataRes.json(),
          ]);
          setCharacterData(charData);
          setCharacterFilmsData(filmsData);
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
  if (characterData.length === 0) {
    return (
      <>
        <div className="w-1/2 mx-auto">
          <div role="alert" className="alert alert-error flex justify-center">
            <span className="font-semibold text-xl text-white">
              Invalid character ID.
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
            {characterData?.name}
          </h1>
          <div className="flex justify-around my-20 text-2xl font-bold text-blue-600">
            <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl">
              Height: {characterData?.height} cm
            </h3>
            <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl">
              Mass: {characterData?.mass} kg
            </h3>
            <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl">
              Height: {characterData?.birth_year}
            </h3>
          </div>
        </div>
        <div>
          <h1 className="text-6xl text-white font-semibold">Homeworld</h1>
          <Link to={`/planet/${characterData?.homeworld}`}>
            <div className="flex justify-start my-20 text-2xl font-bold text-blue-600">
              <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl ms-[110px]">
                {characterData?.homeworldInfo?.name}
              </h3>
            </div>
          </Link>
        </div>
        <div className="max-w-11/12">
          <h1 className="text-6xl text-white font-semibold">
            Films Appeared In
          </h1>
          {characterFilmsData.length === 0 ? (
            <h1 className="text-3xl text-center my-20 text-white font-bold">
              No films found for the character {characterData.name}
            </h1>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 my-20 text-2xl font-bold text-blue-600 ms-[110px]">
              {characterFilmsData.map((film) => (
                <Link to={`/film/${film?.film_id}`} key={film._id}>
                  <h3 className="bg-yellow-300 border-2 border-gray-300 py-6 px-10 rounded-xl text-center">
                    {film?.filmData?.title}
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

export default CharacterDetails;
