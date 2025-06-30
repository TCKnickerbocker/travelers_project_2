import React, { useEffect, useState } from "react";
import Character from "./Character";

const Characters = ({ charName }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/characters?name=${charName}`)
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, [charName]);

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
