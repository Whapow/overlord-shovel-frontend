<template lang='pug'>
  .reset.container
    h3 Reset Password
    i.red {{ errorMessage }}
    .form-group
      label Password 
      input.form-control(type='password', v-model="formData.password")
    .form-group
      label Password Confirmation
      input.form-control(type='password', v-model="formData.password_confirmation")
    .form-group
      button.btn.btn-dark.btn-block(@click="submitReset") Reset Password
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
        formData: {
          id: this.$route.params.user_id,
          reset_token: this.$route.query.reset_token
        },
        errorMessage: ""
      }
    },
    methods: {
      submitReset(){
        const onError = (message)=>{ this.errorMessage = message}
        let formData = this.formData
        if (formData.password && formData.password_confirmation) {
          this.resetPassword({formData, onError})
        }
      },
      ...mapActions({resetPassword: 'users/resetPassword'})
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
</style>
