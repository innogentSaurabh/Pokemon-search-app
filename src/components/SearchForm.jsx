import React, { useState, useEffect } from "react";
import { getPokemonTypes } from "../api/pokemonApi";
import { toast } from "react-toastify";

const SearchForm = ({ handleSearch, handleFilterPokemon }) => {
  const [types, setTypes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchTypes = async () => {
    try {
      const fetchedTypes = await getPokemonTypes();
      setTypes(fetchedTypes);
    } catch (err) {
      console.log("error", err);
      toast.error(err.message || "Something went wrong!!");
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div
      id="search-form"
      className="py-2 px-5 flex justify-between shadow-md bg-neutralBgGrey fixed w-full"
    >
      <select
        className="max-h-10 overflow-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 md:w-52 "
        onChange={(e) => {
          setSearchText("");
          handleFilterPokemon(e.target.value);
        }}
      >
        <option value="">Select </option>
        {types.map((type) => (
          <option className="capitalize" key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <div className="search-container">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.keyCode === 13) {
                handleSearch(e.target.value);
              }
            }}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-2.5 w-32 md:w-56 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg   border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus-visible::ring-blue-500 focus-visible::border-blue-500"
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-lg border border-primary hover:bg-blue-800"
            onClick={() => handleSearch(searchText)}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
