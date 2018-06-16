<template lang="pug">
  .new-user.container
    h3 Sign Up
    .form-group
      label Username 
      i.red {{ errorMessages.display_name | unwrap }}
      input.form-control(type='text', v-model="formData.display_name")
    .form-group
      label Name 
      input.form-control(type='text', v-model="formData.name")
    .form-group
      label Email 
      i.red {{ errorMessages.email | unwrap }}
      input.form-control(type='text', v-model="formData.email")
    .form-group
      button.btn.btn-dark.btn-block(@click="save") Sign up
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data(){
      return {
        formData: {
          id: 0
        }
      }
    },
    computed: mapGetters({errorMessages: 'users/errors'}),
    methods:{
      ...mapActions({submitUser: 'users/submit'}),
      save(){
        if (this.formData.display_name && this.formData.name && this.formData.email){
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

