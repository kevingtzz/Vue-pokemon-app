<template>
  <div class="card details-card">
    <div class="card-content" v-if="this.pokemon">
      <div class="content">
        <div class="content-container">
          <div class="images-container">
            <img
              :src="this.pokemon.sprites['front_default']"
              :alt="this.pokemon.name"
            />
            <img
              :src="this.pokemon.sprites['back_default']"
              :alt="this.pokemon.name"
            />
          </div>
          <div class="name-container">
            <h2>{{ this.pokemon.name }}</h2>
            <div class="favorite-container" v-if="$store.state.userAuth">
              <span class="favorite" v-if="(!!$store.getters.getStoreFavorites[pokemon.id] && this.isFavorite)">
                &#11088
              </span>
              <span class="favorite" v-else>
                &#9734 
              </span>
            </div>
          </div>
          <PokemonProperty title="Weight">
            <span>{{ this.pokemon.weight }}</span>
          </PokemonProperty>
          <PokemonProperty title="Height">
            <span>{{ this.pokemon.height }}</span>
          </PokemonProperty>
          <PokemonProperty title="Base experience">
            <span>{{ this.pokemon.base_experience }}</span>
          </PokemonProperty>
          <PokemonProperty title="Abilities">
            <span>{{ new Intl.ListFormat('en').format(this.getAbilities()) }}</span>
          </PokemonProperty>
          <PokemonProperty title="Moves">
            <span>{{ new Intl.ListFormat('en').format(this.getMoves()) }}</span>
          </PokemonProperty>
          <div class="button-container" v-if="(!!$store.getters.getStoreFavorites[pokemon.id] && this.isFavorite)">
            <button class="button is-primary mt-30" @click="removeFromFavoritesHandler">Remove from favorites</button>
          </div>
          <div class="button-container" v-else>
            <button class="button is-primary mt-30" @click="addToFavoritesHandler">Add to favorites</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <span>
  </span>
</template>

<script>
import { dbAddFavorite, dbRemoveFavorite } from '@/utils/firebase/firebase.utils';
import { getPokemonDetails } from '@/utils/api';

import PokemonProperty from './PokemonProperty.vue';

export default {
  name: 'PokemonDetailsCard',
  data() {
    return {
      pokemon: null,
      pokemonToSend: {},
      favoritesFlag: null,
      isFavorite: true
    };
  },
  created() {
    this.getPokemon();
  },
  watch: {
    favoritesFlag: function(value) {
      this.$store.dispatch('setFavoritesAction');
    }
  },
  methods: {
    getPokemon() {
      getPokemonDetails(this.$route.params.id).then((pokemon) => {
        this.pokemon = pokemon;
        this.pokemonToSend = {
          id: pokemon.id,
          imageUrl: pokemon.sprites['front_default'],
          name: pokemon.name,
          isFavorite: true,
        };
      });
    },
    getAbilities() {
      return this.pokemon.abilities.map(ability => ability.ability.name);
    },
    getMoves() {
      return this.pokemon.moves.map(move => move.move.name);
    },
    addToFavoritesHandler() {
      dbAddFavorite(this.$store.state.userAuth, this.pokemonToSend);
      this.favoritesFlag = true;
      this.isFavorite = true;
    },
    removeFromFavoritesHandler() {
      dbRemoveFavorite(this.$store.state.userAuth, this.pokemonToSend);
      this.favoritesFlag = false;
      this.isFavorite = false;
    },
  },
  components: {
    PokemonProperty
  }
};
</script>

<style lang="scss">
  .details-card {
    margin: 60px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
