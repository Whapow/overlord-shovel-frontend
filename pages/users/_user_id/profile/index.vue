<template lang="pug">
  .profile
    h3 My Profile
    .form(v-if="editing")
      .form-group
        label First Name 
        i.red {{ errorMessages.first_name | unwrap }}
        input.form-control(type='text', v-model="formData.first_name", @keyup.enter="save")
      .form-group
        label Last Name 
        i.red {{ errorMessages.last_name | unwrap }}
        input.form-control(type='text', v-model="formData.last_name", @keyup.enter="save")
      .form-group
        label Username 
        i.red {{ errorMessages.username | unwrap }}
        input.form-control(type='text', v-model="formData.username", @keyup.enter="save")
      .form-group
        label Email 
        i.red {{ errorMessages.email | unwrap }}
        input.form-control(type='text', v-model="formData.email", @keyup.enter="save")
      .form-group
        label Old Password 
        input.form-control(type='password', v-model="formData.old_password")
      .form-group
        label New Password 
        input.form-control(type='password', v-model="formData.password", :disabled="!formData.old_password", @keyup.enter="save")
      .form-group
        label Password Confirmation
        input.form-control(type='password', v-model="formData.password_confirmation", :disabled="!formData.old_password", @keyup.enter="save")
      .form-group
        button.btn.btn-dark.btn-block(@click="save", :disabled="!validated") Save Changes
        button.btn.btn-dark.btn-block(@click="setEditing(false)") Cancel
    button.btn.btn-dark.btn-block(v-else, @click="setEditing(true)") Edit
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'users/getField'
  }) 

  export default {
    data(){
      return {
        editing: false,
        formData: {},
      }
    },
    created(){
      this.get(this.session.user.id);
    },
    methods: {
      ...mapActions({
        get: 'users/get',
        submitUser: 'users/submit'
      }),
      setEditing(value){
        if (value){ this.formData = _.cloneDeep(this.user) }
        this.editing = value
      },
      save(){
        if (this.validated){
          this.submitUser({user: this.formData, callback: ()=>{ this.setEditing(false)}})
        }
      },
    },
    computed:{
      ...mapGetters({
        users: 'users/collection', 
        errorMessages: 'users/errors', 
        session: 'session'
      }),
      user(){ 
        return this.users[this.session.user.id] || {}
      },
      validated(){
        let form = this.formData
        return ( 
          form.username && 
          form.email &&
          (form.old_password ? (form.password_confirmation === form.password && form.password) : true)
        )
      }
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
