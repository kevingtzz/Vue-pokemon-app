import { createStore } from 'vuex';
import { getAuth } from 'firebase/auth';

import { getFavorites } from '@/utils/firebase/firebase.utils';
import { getPokemonsRef } from '@/utils/api';

export default createStore({
  state() {
    return {
      userAuth: null,
      favorites: {},
      pokemons: [],
      pokemonsUrl: 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0',
      nextPageUrl: null,
      previousPageUrl: null,
    };
  },
  mutations: {
    setUserAuth(state) {
      const user = getAuth();
      if (user.currentUser) {
        state.userAuth = user.currentUser;
      } else {
        state.userAuth = null;
      }
    },
    setFavorites(state) {
      getFavorites(state.userAuth).then((favorites) => {
        state.favorites = favorites;
        state.pokemons = state.pokemons.map((pokemon) => {
          pokemon.isFavorite = !!state.favorites[pokemon.id];
          return pokemon;
        });
      });
    },
    setPokemons(state) {
      state.pokemons = [];
      getPokemonsRef(state.pokemonsUrl)
        .then((pokemons) => {
          state.nextPageUrl = pokemons.next;
          state.previousPageUrl = pokemons.previous;
          return pokemons.results;
        })
        .then((pokemonsRefArr) => {
          getFavorites(state.userAuth).then((favorites) => {
            state.favorites = favorites;
            const pokemons = pokemonsRefArr.forEach((pokemonRef) => {
              fetch(pokemonRef.url)
                .then((res) => res.json())
                .then((pokemon) => {
                  const pokemonToAdd = {
                    id: pokemon.id,
                    name: pokemon.name,
                    imageUrl: pokemon.sprites['front_default'],
                    //isFavorite: !!state.favorites[pokemon.id],
                  };
                  state.pokemons.push(pokemonToAdd);
                });
            });
          });
        });
    },
    setNextPokemonsUrl(state) {
      state.pokemonsUrl = state.nextPageUrl;
    },
    setPreviousPokemonsUrl(state) {
      state.pokemonsUrl = state.previousPageUrl;
    },
    resetStore(state) {
      state.userAuth = null;
      state.favorites = {};
    },
  },
  actions: {
    setUserAuthAction({ commit }) {
      commit('setUserAuth');
    },
    setFavoritesAction({ commit }) {
      commit('setFavorites');
    },
    setPokemonsAction({ commit }) {
      commit('setPokemons');
    },
    setNextPokemonsUrlAction({ commit }) {
      commit('setNextPokemonsUrl');
    },
    setPreviousPokemonsUrlAction({ commit }) {
      commit('setPreviousPokemonsUrl');
    },
    resetStoreAction({ commit }) {
      commit('resetStore');
    },
  },
  getters: {
    getDetails(state) {
      return state.pokemonDetails;
    },
    getUserAuth(state) {
      return state.userAuth;
    },
    getStoreFavorites(state) {
      return state.favorites;
    },
  },
});
