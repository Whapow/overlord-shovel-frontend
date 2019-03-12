<template lang='pug'>
  div
    nav.navbar.navbar-expand.navbar-dark.bg-dark.justify-content-between.mb-3
      router-link.navbar-brand(to="/") Overlord Shovel
      ul.navbar-nav
        li.nav-item.active
          router-link.nav-link(v-if="session.active", :to="`/users/${session.user.id}/characters`") My Characters 
          router-link.nav-link(v-else, to="/login") Sign in
    .container      
      nuxt
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  created(){
    if (this.session.active){
      this.loadCampaigns()
      this.loadUsers()
    }
  },
  computed: mapGetters({session: 'session', }),
  methods: mapActions({loadCampaigns: 'campaigns/init', loadUsers: 'users/init'})
}
</script>
