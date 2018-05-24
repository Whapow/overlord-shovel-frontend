<template lang='pug'>
  .login
    div
      label Username
      input(type='text', v-model="user.name")
    div
      label Password
      input(type='password', v-model="passwordEntry")
    div
      label Remember Me
      input(type='checkbox')
    div
      button(@click="submitLogin") Login
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