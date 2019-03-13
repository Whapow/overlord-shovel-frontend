<template lang="pug">
  ul.navbar-nav
    li.nav-item.active
      router-link.nav-link(:to="`/users/${session.user.id}/profile`") My Profile 
    li.nav-item.active
      router-link.nav-link(:to="`/users/${session.user.id}/characters`") My Characters 
    li.nav-item.active
      a.nav-link(@click.prevent='logout', href="") Logout 
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    computed: mapGetters({session: 'session'}),
    methods: mapActions({logout: 'session/logout'})
  }
</script>
