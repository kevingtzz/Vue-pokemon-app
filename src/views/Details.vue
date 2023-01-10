<template>
  <PokemonDetailsCard />
</template>

<script>
import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import PokemonDetailsCard from '@/components/PokemonDetailsCard.vue';
export default {
  name: 'Details',
  created() {
    onAuthStateChangedListener((user) => {
      if (user) {
        this.$store.dispatch('setUserAuthAction');
        this.$store.dispatch('setFavoritesAction');
      }
    });
  },
  components: { PokemonDetailsCard },
};
</script>
