<template>
  <div class="signup-container mt-50">
    <div class="colunms">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Log In</h3>
        <hr />
        <form action="#" @submit.prevent="login">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
                v-model="email"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" v-model="password" />
            </div>
          </div>
          <button class="button is-primary">Sign in</button>
        </form>
        <div class="notification is-danger mt-10" v-if="error">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signInAuthUserWithEmailAndPassword } from '@/utils/firebase/firebase.utils';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  name: 'LogIn',
  methods: {
    async login() {
      this.error = '';
      if (this.email && this.password) {
        try {
          await signInAuthUserWithEmailAndPassword(this.email, this.password);
          this.email = '';
          this.password = '';
          this.$router.push({ name: 'home' });
        } catch (err) {
          this.error = err.message;
        }
      } else {
        this.error = 'All fields are requiered';
      }
    },
  },
};
</script>
