<template lang='pug'>
  .navbar
    h3.title Overlord Shovel
    div.right
      div(v-if="loginVisible")
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
        a(href="#", @click.prevent="setLoginFormVisibility(false)") Cancel
      div(v-else)
        h4(v-if="loggedIn") {{ user.name }}
        a(v-else, href="#", @click.prevent="setLoginFormVisibility(true)") Login
</template>

<script>
  export default {
    data(){
      return {
        loginVisible: false,
        loggedIn: false,
        user: {},
        passwordEntry: null
      }
    },
    methods: {
      setLoginFormVisibility(value){
        this.loginVisible = value
      },
      submitLogin(){
        if (this.user.name && this.passwordEntry) {
          this.loggedIn = true
          this.setLoginFormVisibility(false)
          this.passwordEntry = null
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  .navbar {
    background-color: grey;
    width: 100%;
    height: 3rem;
  }

  .right {
    position: absolute;
    right: 0px;
    padding: 1rem
  }
</style>
