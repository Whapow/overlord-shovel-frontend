<template lang='pug'>
  .reset.container
    h3 Forgot Password
    i.red {{ errorMessage }}
    .form-group
      label Username
      input.form-control(type='text', v-model="formData.username", @keyup.enter="submitReset")
    p.or OR
    .form-group
      label Email
      input.form-control(type='text', v-model="formData.email", @keyup.enter="submitReset")
    .form-group
      button.btn.btn-dark.btn-block(@click="submitReset") Send Reset Link
    .form-group
      p.small.text-center.text-secondary Don't have an account yet? 
        router-link(:to="`/users/new`") Sign up
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    auth: false,
    data(){
      return {
        formData: {},
        errorMessage: ""
      }
    },
    methods: {
      submitReset(){
        const onError = (message)=>{ this.errorMessage = message}
        if (this.formData.username || this.formData.email) {
          this.forgotPassword({formData: this.formData, onError})
        }
      },
      ...mapActions({forgotPassword: 'users/forgotPassword'})
    }
  }
</script>

<style lang="scss" scoped>
  .reset.container {
    max-width: 25rem;
  }
  
  i.red {
    color: red
  }

  .or {
    text-align: center;
    padding-bottom: 0px;
    margin-bottom: 0px; 
  }
</style>
