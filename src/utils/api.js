export const getPokemonsRef = (url) => {
  return fetch(url).then((res) => res.json());
};

export const getPokemonDetails = (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
    res.json()
  );
};
