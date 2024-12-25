import axios from "axios";

const API_BASE = "https://pokeapi.co/api/v2";

export const getPokemonList = async () => {
  const response = await axios.get(`${API_BASE}/pokemon/?limit=100`);
  return response.data.results;
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
