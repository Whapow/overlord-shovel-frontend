<template lang='pug'>
  .login.container
    h3 Sign in
    .form-group
      label Username
      input.form-control(type='text', v-model="user.name")
    .form-group
      .d-flex.justify-content-between
        label Password
        a.text-secondary(href="#") Forgot password?
      input.form-control(type='password', v-model="passwordEntry")
    .form-group.form-check
      input.form-check-input(type='checkbox', id="checkbox")
      label.form-check-label(for="checkbox") Remember Me
    .form-group
      button.btn.btn-dark.btn-block(@click="submitLogin") Sign in
    .form-group
      p.small.text-center.text-secondary Don't have an account yet? 
        a(href="#") Sign up
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
  
  a:hover {
    text-decoration: none;
  }
</style>
