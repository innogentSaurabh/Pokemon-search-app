import React, { useState, useEffect, lazy, Suspense } from "react";
import SearchForm from "../components/SearchForm";
import { getPokemonList, getPokemonListByType } from "../api/pokemonApi";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import CardSkeletonLoader from "../components/CardSkeletonLoader";
import { toast, ToastContainer } from "react-toastify";

const PokemonCard = lazy(() => import("../components/PokemonCard"));

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(500);
  const [totalCount, setTotalCount] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const fetchPokemon = async (offsetParam = 0, limitParam = 500) => {
    try {
      setLoading(true);
      const response = await getPokemonList(offsetParam, limitParam);
      const detailedPokemons = await Promise.all(
        response.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return details.data;
        })
      );
      setPokemonList((prevList) => [...prevList, ...detailedPokemons]);
      setTotalCount(response.count);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = async (query) => {
    try {
      setLoading(true);
      setIsFiltering(false);
      let allPokemon = [];
      let currentOffset = 0;

      while (currentOffset < totalCount) {
        const response = await getPokemonList(currentOffset, 1000);
        allPokemon = [...allPokemon, ...response.results];
        if (
          response.results.length < 1000 ||
          allPokemon.length >= response.count
        ) {
          break;
        }
        currentOffset += 1000;
      }

      const searchedPokemon = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      const detailedPokemons = await Promise.all(
        searchedPokemon.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return response.data;
        })
      );

      setFilteredPokemon(detailedPokemons);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleLoadMore = () => {
    if (pokemonList.length < totalCount && !searchQuery && !isFiltering) {
      fetchPokemon(pokemonList.length, limit);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setPokemonList([]);
      searchPokemon(query);
    } else {
      setFilteredPokemon([]);
      fetchPokemon();
    }
  };

  const handleFilterPokemon = async (type) => {
    if (type) {
      setSearchQuery("");
      setPokemonList([]);
      setFilteredPokemon([]);
      setIsFiltering(true);
      try {
        setLoading(true);
        const data = await getPokemonListByType(type);
        const detailedPokemons = await Promise.all(
          data.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return response.data;
          })
        );
        setFilteredPokemon(detailedPokemons);
      } catch (err) {
        console.error("Error:", err);
        toast.error(err.message || "Something went wrong!!");
      } finally {
        setLoading(false);
      }
    } else {
      setFilteredPokemon([]);
      setIsFiltering(false);
      fetchPokemon();
    }
  };
  const showPokemonCards = (pokemon) => {
    return (
      <Suspense fallback={<CardSkeletonLoader />}>
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      </Suspense>
    );
  };

  return (
    <div>
      <ToastContainer position="top-right" />
      {loading && <LoadingScreen />}
      <SearchForm
        handleSearch={handleSearch}
        handleFilterPokemon={handleFilterPokemon}
      />
      {filteredPokemon.length > 0 || pokemonList.length > 0 ? (
        <div
          data-testid="pokemon-list"
          className="pokemon-list container pt-20 pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 "
        >
          {isFiltering
            ? filteredPokemon.map((pokemon) => showPokemonCards(pokemon))
            : searchQuery
            ? filteredPokemon.map((pokemon) => showPokemonCards(pokemon))
            : pokemonList.map((pokemon) => showPokemonCards(pokemon))}
        </div>
      ) : (
        <div className="text-primary pt-20 text-center">No Pokémon found.</div>
      )}
      {!loading &&
        pokemonList.length < totalCount &&
        !searchQuery &&
        !isFiltering && (
          <div className="text-center">
            <button onClick={handleLoadMore} className=" text-primary pb-10 ">
              Load More...
            </button>
          </div>
        )}
    </div>
  );
};

export default Home;
