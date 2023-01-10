<template>
  <div class="pokemon-list-container">
    <div
      class="pokemon-card-container"
      v-for="pokemon in this.pokemons"
      :key="pokemon.id"
    >
      <PokemonCard :pokemon="pokemon" />
    </div>
  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard.vue';
export default {
  name: 'PokemonsCardList',
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
  },
  components: {
    PokemonCard,
  },
};
</script>

<Style lang="scss">
.pokemon-list-container {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 50px;
}
</Style>
