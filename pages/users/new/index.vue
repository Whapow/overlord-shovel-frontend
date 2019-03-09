<template lang="pug">
  .new-user.container
    h3 Sign Up
    .form-group
      label Username 
      i.red {{ errorMessages.username | unwrap }}
      input.form-control(type='text', v-model="formData.username")
    .form-group
      label Email 
      i.red {{ errorMessages.email | unwrap }}
      input.form-control(type='text', v-model="formData.email")
    .form-group
      label Password 
      input.form-control(type='password', v-model="formData.password")
    .form-group
      label Password Confirmation
      input.form-control(type='password', v-model="formData.password_confirmation")
    .form-group
      button.btn.btn-dark.btn-block(@click="save", :disabled="!validated") Sign up
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    auth: false,
    data(){
      return {
        formData: {
          id: 0
        }
      }
    },
    computed: {
      ...mapGetters({errorMessages: 'users/errors'}),
      validated(){
        return ( 
          this.formData.username && 
          this.formData.password &&
          this.formData.password_confirmation === this.formData.password &&
          this.formData.email
        )
      }
    },
    methods:{
      ...mapActions({submitUser: 'users/submit'}),
      save(){
        if (this.validated){
          this.submitUser({user: this.formData})
        }
      },
    },
    filters:{
      unwrap(error){
        if (error){
          return String(error).replace(/\"|\[|\]/, null)
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .new-user.container {
    max-width: 25rem;
  }
  
  a:hover {
    text-decoration: none;
  }

  i.red {
    color: red;
    padding-left: 1rem;
  }
</style>

