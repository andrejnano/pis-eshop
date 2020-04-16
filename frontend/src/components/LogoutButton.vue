<template>
  <a class="logout-button" @click="logout">
    Log Out
  </a>
</template>

<script>
export default {
  name: 'LogoutButton',
  methods: {
    logout: function() {
      this.$store.dispatch('AUTH_LOGOUT')
        .then(() => {
          this.$router.push('/login')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .logout-button {
    padding: 0.5rem 0.75rem;
    color: #5f5f5f;
    font-size: 1rem;
    border-radius: 4px;
    font-weight: 600;
    background: #f3f3f3;
    text-decoration: none;
    /* filter: grayscale(90%) opacity(0.7); */
    transition: 100ms;
    cursor: pointer;

    &:hover {
      /* filter: grayscale(0%) opacity(1); */
      background: #e5e5e5;
      color: #B721FF;
    }
  }
</style>
