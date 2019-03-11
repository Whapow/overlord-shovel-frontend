<template lang="pug">
  .characters
    router-link.btn.btn-light(:to="`/`") Back to Campaigns
    h3 {{ user.display_name }} - Characters
    table.table.table-hover
      thead
        tr
          th Character Name
          th(colspan="2") Campaign
      tbody
        character-row(v-for="character in characters[userId]", :key="character.id", :character="character")
        tr(v-if="user.id && session.user.id == user.id")
          td(colspan="3")
            a(href="#", @click.prevent="newCharacter(userId)") Add New
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'characters/getField'
  }) 

  import CharacterRow from '~/components/characterRow'

  export default {
    components: {CharacterRow},
    data(){
      return {
        userId: this.$route.params.user_id
      }
    },
    methods: {
      ...mapActions({
        init: 'characters/init',
        newCharacter: 'characters/new'
      })
    },
    computed:{
      ...mapGetters({characters: 'characters/byPlayer', users: 'users/collection', session: 'session/session'}),
      user(){ return this.users[this.userId] || {} }
    },
    created(){
      this.init(this.$route.params);
    }
  }
</script>

