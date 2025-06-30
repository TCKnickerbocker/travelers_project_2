import React from "react";
import { Link } from "react-router-dom";

const Character = ({ character }) => {
  return (
    <Link to={`/character/${character.id}`}>
      <div className="card w-48 bg-sky-100 card-xs shadow-lg border-b-2 border-blue-400">
        <div className="card-body">
          <h2 className="text-center font-semibold text-gray-600 text-lg">
            {character.name}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Character;
