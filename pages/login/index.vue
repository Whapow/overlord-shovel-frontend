<template lang='pug'>
  .login.container
    h3 Sign in
    i.red {{ errorMessage }}
    .form-group
      label Username
      input.form-control(type='text', v-model="formData.display_name")
    .form-group
      .d-flex.justify-content-between
        label Password
        a.text-secondary(href="#") Forgot password?
      input.form-control(type='password', v-model.password="formData.password", :disabled="true")
    .form-group.form-check
      input.form-check-input(type='checkbox', id="checkbox")
      label.form-check-label(for="checkbox") Remember Me
    .form-group
      button.btn.btn-dark.btn-block(@click="submitLogin") Sign in
    .form-group
      p.small.text-center.text-secondary Don't have an account yet? 
        router-link(:to="`/users/new`") Sign up
</template>

<script>
  import { mapActions } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'session/getField'
  }) 
  export default {
    data(){
      return {
        formData: {},
      }
    },
    computed: mapFields(['errorMessage']),
    methods: {
      submitLogin(){
        if (this.formData.display_name) {
          this.login(this.formData)
        }
      },
      ...mapActions({login: 'session/login'})
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

  i.red {
    color: red
  }
</style>
