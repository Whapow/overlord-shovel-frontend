<template lang='pug'>
  div
    nav.navbar.navbar-expand.navbar-dark.bg-dark.justify-content-between.mb-3
      router-link.navbar-brand(to="/") Overlord Shovel
      router-link.nav-link(to="/items") Items
      user-dropdown(v-if="session.active")
      ul.navbar-nav.dropdown(v-else)
        li.nav-item.active
          router-link.nav-link(to="/login") Sign in
    .flex.page-body      
      nuxt
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import userDropdown from '~/components/userDropdown'
export default {
  created(){
    if (this.$auth.loggedIn){
      this.getsession()
    }
  },
  components: {userDropdown},
  computed: mapGetters({session: 'session'}),
  methods: mapActions({getsession: 'session/get'})
}
</script>
