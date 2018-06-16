<template lang='pug'>
  div
    nav.navbar.navbar-expand.navbar-dark.bg-dark.justify-content-between.mb-3
      router-link.navbar-brand(to="/") Overlord Shovel
      
      ul.navbar-nav
        li.nav-item.active
          router-link.nav-link(v-if="currentUser.id", :to="`/users/${currentUser.id}/characters`") My Characters
          router-link.nav-link(v-else, to="/login") Sign in
    .container      
      nuxt
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  created(){
    this.loadCampaigns()
    this.loadUsers()
  },
  computed: mapGetters({currentUser: 'session/currentUser'}),
  methods: mapActions({loadCampaigns: 'campaigns/init', loadUsers: 'users/init'})
}
</script>
