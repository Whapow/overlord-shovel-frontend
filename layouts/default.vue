<template lang='pug'>
  div
    nav.navbar.navbar-expand.navbar-dark.bg-dark.justify-content-between.mb-3
      router-link.navbar-brand(to="/") Overlord Shovel
      user-dropdown(v-if="session.active")
      ul.navbar-nav.dropdown(v-else)
        li.nav-item.active
          router-link.nav-link(to="/login") Sign in
    .container      
      nuxt
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import userDropdown from '~/components/userDropdown'
export default {
  components: {userDropdown},
  computed: mapGetters({session: 'session'})
}
</script>
