<template>
  <div>
    <span
      ><b>{{ this.title }}: </b></span
    >
    <span><slot>Property</slot></span>
  </div>
</template>

<script>
export default {
  name: 'PokemonPropery',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
