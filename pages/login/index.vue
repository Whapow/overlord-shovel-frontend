<template lang='pug'>
  .login.container
    .form-group
      label Username
      input.form-control(type='text', v-model="user.name")
    .form-group
      label Password
      input.form-control(type='password', v-model="passwordEntry")
    .form-group.form-check
      input.form-check-input(type='checkbox', id="checkbox")
      label.form-check-label(for="checkbox") Remember Me
    .form-group
      button.btn.btn-dark.btn-block(@click="submitLogin") Login
</template>

<script>
  export default {
    data(){
      return {
        loggedIn: false,
        user: {},
        passwordEntry: null,
      }
    },
    methods: {
      submitLogin(){
        if (this.user.name && this.passwordEntry) {
          this.loggedIn = true
          this.passwordEntry = null
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .login.container {
    max-width: 25rem;
  }
</style>
