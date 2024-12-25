import axios from "axios";

const API_BASE = "https://pokeapi.co/api/v2";

export const getPokemonList = async (offset = 0, limit = 500) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  return response.data;
};
export const getPokemonListByType = async (type) => {
  const response = await axios.get(`${API_BASE}/type/${type}`);
  return response.data.pokemon.map((p) => p.pokemon);
};
export const getPokemonDetails = async (name) => {
  const response = await axios.get(`${API_BASE}/pokemon/${name}`);
  return response.data;
};

export const getPokemonTypes = async () => {
  const response = await axios.get(`${API_BASE}/type`);
  return response.data.results;
};
