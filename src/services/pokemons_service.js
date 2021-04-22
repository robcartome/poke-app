import { apiFetch, BASE_URL } from "./api_fetch.js";

function PokemonsService() {
  if (!PokemonsService.instance) {
    PokemonsService.instance = this;
  }
  return PokemonsService.instance;
}

PokemonsService.prototype.list = () =>
  apiFetch(`${BASE_URL}/pokemon`, {
    method: "GET",
  });

PokemonsService.prototype.showPokemon = (pokemonId) => {
  const resp = apiFetch(`${BASE_URL}/pokemon/${pokemonId}`, {
    method: "GET"
  });
  return resp;
};
PokemonsService.prototype.showPokemonSpecies = (pokemonId) => {
  const resp = apiFetch(`${BASE_URL}/pokemon-species/${pokemonId}`, {
    method: "GET"
  });
  return resp;
};
export default PokemonsService;
