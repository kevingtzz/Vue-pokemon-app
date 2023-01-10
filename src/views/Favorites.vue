<template>
  <div class="pokemon-list-container">
    <div
      class="pokemon-card-container"
      v-for="pokemon in pokemons"
      :key="pokemon.id"
    >
      <PokemonCard :pokemon="pokemon" />
    </div>
  </div>
</template>

<script>
import {
  onAuthStateChangedListener,
  getFavorites,
} from '@/utils/firebase/firebase.utils';

import PokemonCard from '../components/PokemonCard.vue';
export default {
  name: 'Favorites',
  data() {
    return {
      user: null,
      pokemons: [],
    };
  },
  created() {
    onAuthStateChangedListener((user) => {
      if (user) {
        getFavorites(this.$store.state.userAuth).then((favorites) => {
          const newPokemons = [];
          for (let pokemon in favorites) {
            newPokemons.push(favorites[pokemon]);
          }
          this.pokemons = newPokemons;
        });
      } else {
        this.user = null;
      }
    });
  },
  components: {
    PokemonCard,
  },
};
</script>
