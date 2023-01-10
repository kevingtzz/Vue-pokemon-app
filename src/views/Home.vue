<template>
  <PokemonsCardList :pokemons="$store.state.pokemons" />
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a
      class="pagination-previous"
      :class="{ 'is-disabled': page === 1 }"
      @click.prevent="previousPageHandler"
      >Previous</a
    >
    <a class="pagination-next" @click.prevent="nextPageHandler">Next page</a>
  </nav>
</template>

<script>
import PokemonsCardList from '@/components/PokemonsCardList.vue';

import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

export default {
  data() {
    return {
      page: 1,
    };
  },
  name: 'Home',
  created() {
    onAuthStateChangedListener((user) => {
      if (user) {
        this.$store.dispatch('setUserAuthAction');
        this.$store.dispatch('setFavoritesAction');
      }
    });

    this.$store.dispatch('setPokemonsAction');
  },
  methods: {
    nextPageHandler() {
      this.$store.dispatch('setNextPokemonsUrlAction');
      this.$store.dispatch('setPokemonsAction');
      this.page++;
    },
    previousPageHandler() {
      this.$store.dispatch('setPreviousPokemonsUrlAction');
      this.$store.dispatch('setPokemonsAction');
      this.page--;
    },
  },
  components: {
    PokemonsCardList,
  },
};
</script>

<Style lang="scss">
.pagination {
  margin: 50px;
}
</Style>
