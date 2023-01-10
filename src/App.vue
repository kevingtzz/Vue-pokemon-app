<template>
  <Navigation />
  <router-view />
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';

* {
  box-sizing: border-box;
}

body {
  padding-top: 50px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-30 {
  margin-top: 30px;
}

.mt-50 {
  margin-top: 50px;
}
</style>
