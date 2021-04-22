const BASE_URL = "https://pokeapi.co/api/v2";

/* interface dataP{
  data: {},
}*/

async function apiFetch(...args) {
 const response = await fetch(...args);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors);
  }
  if (response.status !== 204) {
    return await response.json();
  }
  return true;
}

export { BASE_URL, apiFetch };
