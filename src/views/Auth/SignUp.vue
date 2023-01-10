<template>
  <div class="signup-container mt-50">
    <div class="colunms">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Create Account</h3>
        <hr />
        <form action="#" @submit.prevent="register">
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
          <button class="button is-primary">Create</button>
        </form>
        <div class="notification is-danger mt-10" v-if="error">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '@/utils/firebase/firebase.utils';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  name: 'SignUp',
  methods: {
    async register() {
      this.error = '';
      if (this.email && this.password) {
        try {
          const { user } = await createAuthUserWithEmailAndPassword(
            this.email,
            this.password
          );
          await createUserDocumentFromAuth(user);
          this.$router.push({ name: 'home' });
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            this.error = 'Cannot create user, email already in use';
          } else {
            this.error = error.message;
          }
        }
      }
    },
  },
};
</script>
