import React, { useState, useEffect, lazy } from "react";
import SearchForm from "../components/SearchForm";
import { getPokemonList, getPokemonListByType } from "../api/pokemonApi";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";

const PokemonCard = lazy(() => import("../components/PokemonCard"));

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async (searchedPokemon) => {
    try {
      setLoading(true);
      const data = await getPokemonList();
      if (searchedPokemon) {
        const searchedPokemons = data.filter((pokemon) =>
          pokemon.name.includes(searchedPokemon)
        );
        const detailedPokemons = await Promise.all(
          searchedPokemons.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return response.data;
          })
        );
        setPokemonList(detailedPokemons);
      } else {
        const detailedPokemons = await Promise.all(
          data.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return response.data;
          })
        );
        setPokemonList(detailedPokemons);
      }
    } catch (err) {
      console.log("error : ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleFilterPokemon = async (type) => {
    if (type) {
      try {
        setLoading(true);
        const data = await getPokemonListByType(type);
        const detailedPokemons = await Promise.all(
          data.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return response.data;
          })
        );
        setPokemonList(detailedPokemons);
      } catch (err) {
        console.log("error : ", err);
      } finally {
        setLoading(false);
      }
    } else {
      fetchPokemon();
    }
  };

  return (
    <div>
      {loading && <LoadingScreen />}
      <SearchForm
        handleSearch={fetchPokemon}
        handleFilterPokemon={handleFilterPokemon}
      />
      {pokemonList.length ? (
        <div
          data-testid="pokemon-list"
          className="pokemon-list container py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 "
        >
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="text-primary pt-20 text-center">No Pokémon found.</div>
      )}
    </div>
  );
};

export default Home;
