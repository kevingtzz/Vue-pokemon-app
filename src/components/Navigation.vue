<template>
  <nav class="navbar nav-app" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoBDuy7W9e-c5Sz8xBV2ERBy2X0aeis1xPzQ&usqp=CAU"
        />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isOpen }"
        @click.prevent="toggleMenu"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isOpen }"
    >
      <div class="navbar-start">
        <router-link class="navbar-item" to="/favorites">
          Favorites
        </router-link>
        <router-link class="navbar-item" to="/documentation">
          Documentation
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <template v-if="user">
            <div class="buttons">
              <a class="button is-danger" @click.prevent="logout"> Log out </a>
            </div>
          </template>
          <template v-else>
            <div class="buttons">
              <router-link class="button is-primary" to="/signup">
                <strong>Sign up</strong>
              </router-link>
              <router-link class="button is-light" to="/login">
                Log in
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {
  signOutUser,
  onAuthStateChangedListener,
} from '@/utils/firebase/firebase.utils';
export default {
  data() {
    return {
      isOpen: false,
      user: null,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      signOutUser();
      this.$store.dispatch('resetStoreAction');
      this.$router.push({ name: 'login' });
    },
  },
  created() {
    onAuthStateChangedListener((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style lang="scss">
.nav-app {
  position: fixed !important;
  top: 0;
  width: 100vw;
}
</style>
