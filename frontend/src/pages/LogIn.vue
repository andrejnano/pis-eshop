<template>
  <div class="login-page">

    <div class="login-form-outer">

      <form id="login" class="login-form" @submit.prevent="submit">

        <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
          <label for="email-input">Email</label>
          <input type="text" autocomplete="email" id="email-input" v-model.trim="$v.email.$model">
        </div>

        <div class="error" v-if="!$v.email.required">Email is required</div>
        <div class="error" v-if="!$v.email.minLength">Email must be at least {{$v.email.$params.minLength.min }} characters long.</div>

        <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
          <label for="password-input">Password</label>
          <input type="password" autocomplete="current-password" id="password-input" v-model.trim="$v.password.$model">
        </div>

        <div class="error" v-if="!$v.password.required">Password is required</div>
        <div class="error" v-if="!$v.password.minLength">Password must be at least {{$v.password.$params.minLength.min }} characters long.</div>

        <div class="form-group">
          <input class="submit-form-button" label="Sign in" type="submit"/>
        </div>
      </form>

      <div v-if="showResult" class='result'>
        <br>Logged in as <strong>{{ resEmail }}</strong> with the token: <br><textarea v-model='resToken'></textarea>
      </div>

    </div>

  </div>
</template>


<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {

  name: 'LoginForm',

  data ()  {
    return {
      email: '',
      password: '',
      showResult: false,
      resEmail: '',
      resToken: ''
    }
  },


  validations: {
    email: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(6),
    }
  },
  methods: {
    submit: function () {

      // validate input and only then send to API
      if (this.email && this.password) {
        this.$store.dispatch('AUTH_REQUEST', { email: this.email, password: this.password })
          .then(() => {
            this.$router.push('/')
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
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


    .form-group {
      margin-top: 1.2rem;
      width: 300px;
      max-width: 90vw;

      border: 1px solid transparent;

      label {
        display: block;
        color: #5f5f5f;
        font-size: 1.2rem;
        font-weight: 400;
        padding: 5px 2px;
      }

      input[type=text], input[type=password] {
        outline: none;
        border: 2px solid #5f5f5f;
        border-radius: 5px;
        height: 3rem;
        font-size: 1.8rem;
        width: 100%;
        padding: 5px;
      }
    }

    .form-group--error {

      > input[type=text], input[type=password] {
        border: 2px solid red;
      }
    }

    .error {
      display: absolute;
      padding: 5px;
      font-weight: 600;
      /* font-style: italic; */
      font-size: 1rem;
      color: red;
    }


    .submit-form-button {
      width: 100%;
      color: #fff;
      font-weight: 800;
      padding: 1rem 2rem;
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: #00f2fe;
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: #4facfe;
        transition: background-color 0.2s ease-in-out;
      }

      &:active {
        box-shadow: 0px 0px 0px 2px #a3a3a3;
      }

      &:focus {
        box-shadow: 0px 0px 0px 2px #5f5f5f;
      }
    }
  }
</style>
