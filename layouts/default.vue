<template lang='pug'>
  div
    nav.navbar.navbar-expand.navbar-dark.bg-dark.justify-content-between.mb-3
      router-link.navbar-brand(to="/") Overlord Shovel
      
      ul.navbar-nav
        li.nav-item.active
          router-link.nav-link(to="/login") Sign in
    .container      
      nuxt
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created(){
    this.loadCampaigns()
    this.loadUsers()
  },
  methods: mapActions({loadCampaigns: 'campaigns/init', loadUsers: 'users/init'})
}
</script>
