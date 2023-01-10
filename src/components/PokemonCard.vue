<template>
  <div class="card pokemon-card" @click="cardClickHandler">
    <div class="card-content pokemon-card-content">
      <div class="content">
        <img :src="pokemon.imageUrl" :alt="pokemon.name" />
        <div class="name-container">
          <h2>{{ pokemon.name }}</h2>
          <div class="favorite-container" v-if="$store.state.userAuth">
            <span class="favorite" v-if="(!!$store.state.favorites[this.pokemon.id])">
              &#11088
            </span>
            <span class="favorite" v-else>
              &#9734
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    },
  },
  methods: {
    cardClickHandler() {
      this.$router.push({ name: 'details', params: { id: this.pokemon.id } });
    }
  },
};
</script>

<Style lang="scss">
.pokemon-card {
  width: 240px;
}

.pokemon-card:hover {
    box-shadow: 0px 0px 10px cornflowerblue;
}

.pokemon-card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.name-container {
  display: flex;
  gap: 10px;
}

.favorite {
  font-size: 23px;
}
</Style>
