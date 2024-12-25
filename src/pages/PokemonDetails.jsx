import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetails } from "../api/pokemonApi";
import LoadingScreen from "./LoadingScreen";

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const data = await getPokemonDetails(name);
      setPokemon(data);
    } catch (err) {
      console.log("error : ", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, [name]);

  if (loading) return <LoadingScreen />;

  return (
    pokemon && (
      <div>
        <div className="py-4 px-5  bg-neutralBgGrey w-full shadow-md font-semibold">
          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>
          &nbsp; / &nbsp;
          <span className="capitalize">{pokemon.name}</span>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-3 py-5 lg:px-40 ">
          <div className="bg-[#5fe1c8] min-h-[40vh]  flex align-middle justify-center rounded-t-xl md:rounded-s-xl md:rounded-tr-none ">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="object-contain min-w-60"
            />
          </div>
          <div className="col-span-2 p-5 rounded-b-xl md:rounded-e-xl md:rounded-bl-none bg-[#fac364]">
            <h1 className="text-center text-4xl font-semibold capitalize font-serif mb-4">
              {pokemon.name}
            </h1>
            <div>
              <p>
                <span className="font-semibold"> Height :</span>{" "}
                {pokemon.height} cm
              </p>
              <p>
                <span className="font-semibold"> Weight :</span>{" "}
                {pokemon.weight} lbs
              </p>
              <p className="capitalize">
                <span className="font-semibold">Abilites : &nbsp;</span>
                {pokemon.abilities.map((a) => a.ability.name).join(", ")}
              </p>
              <p className="capitalize">
                <span className="font-semibold">Types : &nbsp;</span>
                {pokemon.types.map((t) => t.type.name).join(", ")}
              </p>
              <p className="capitalize">
                <span className="font-semibold">Stats : &nbsp;</span>
                {pokemon.stats.map((s) => s.stat.name).join(", ")}
              </p>
              <p className="capitalize">
                <span className="font-semibold">Moves : &nbsp;</span>
                {pokemon.moves.map((m) => m.move.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PokemonDetails;
