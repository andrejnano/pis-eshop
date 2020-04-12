<template>
  <div class="register-page">

    <div class="register-form-outer">

      <form id="register" class="register-form" @submit.prevent="submit">

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
          <label for="email-input">Email</label>
          <input type="email" name="email" autocomplete="email" id="email-input" v-model="email">
        </div>

        <div class="form-row">
          <label for="password-input">Password</label>
          <input type="password" name="password" autocomplete="new-password" id="password-input" v-model="password">
        </div>

        <div class="form-row">
          <label for="repeat-password-input">Repeat password</label>
          <input type="password" name="repeat-password" autocomplete="new-password" id="repeat-password-input" v-model="password">
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

  name: 'RegistrationForm',

  data ()  {
    return {
      username: null,
      email: null,
      password: null,
      repeatedPassword: null,
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

  .register-form-outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;


    .register-form {

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

        input[type=text], input[type=email], input[type=password] {
          height: 3rem;
          font-size: 1.8rem;
          width: 100%;
          padding: 5px;
        }
      }
    }
  }
</style>
