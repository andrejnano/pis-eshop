<template>
  <div class="login-page">

    <div class="login-form-outer">

      <form id="login" class="login-form" @submit.prevent="submit">

        <div class="form-row" v-if="errors.length">
          <b>There are errors with your credentials:</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </div>

        <div class="form-row">
          <label for="username-input">Username</label>
          <input type="text" name="username" autocomplete="username" id="username-input" v-model="username">
        </div>

        <div class="form-row">
          <label for="password-input">Password</label>
          <input type="password" name="password" autocomplete="current-password" id="password-input" v-model="password">
        </div>

        <div class="form-row">
          <input label="Sign in" type="submit"/>
        </div>
      </form>

    </div>

  </div>
</template>


<script>

export default {

  name: 'LoginForm',

  data ()  {
    return {
      username: null,
      password: null,
      errors: [],
    }
  },

  methods: {
    submit: function () {

      if (this.username && this.password) {
        console.log(`${this.username} + ${this.password}`);
        return true;
      }

      this.errors = [];

      if (!this.username) {
        this.errors.push("Username missing.");
      }

      if (!this.password) {
        this.errors.push("Password missing.")
      }

    }
  },
}
</script>


<style lang="scss" scoped>

  .login-form-outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;


    .login-form {

      .form-row {
        margin-bottom: 1.2rem;
        width: 300px;
        max-width: 90vw;

        label {
          display: block;
          color: #5f5f5f;
          font-size: 1rem;
          font-weight: 500;
          padding: 2px;
        }

        input[type=text], input[type=password] {
          height: 3rem;
          font-size: 1.8rem;
          width: 100%;
          padding: 5px;
        }
      }
    }
  }
</style>
