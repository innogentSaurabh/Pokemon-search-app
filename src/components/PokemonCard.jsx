import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg">
        <div>
          <img
            className="rounded-t-lg object-cover w-full h-40 md:h-56"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
        <div className="px-4 py-3 bg-neutralBgGrey">
          <h5 className="mb-2 text-lg font-semibold text-gray-900 capitalize">
            {pokemon.name}
          </h5>
          <Link
            to={`/pokemon/${pokemon.name}`}
            className="inline-flex items-center text-xs font-medium text-primary rounded-lg hover:text-blue-800 hover:gap-1"
          >
            View Details
            <svg
              className="rtl:rotate-180 w-3 h-3 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
