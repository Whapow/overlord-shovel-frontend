<template lang="pug">
  .journal
    router-link.btn.btn-light(:to="`/campaigns/${campaignId}/journals`") Back to Journals
    table.table.table-hover
      thead
        tr
          th  Character
          th  Reward Value
          th  Experience
      tbody
        journal-entry-row(v-for="entry in entries", :key="entry.id", :entry="entry")
        tr
          td
            button.btn.btn-light(@click="newEntry") Add New
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import journalEntryRow from '~/components/journalEntryRow.vue'
  export default {
    components: { journalEntryRow },
    data(){
      return {
        campaignId: this.$route.params.campaign_id
      }
    },
    computed: {
      ...mapGetters({entries: 'entries/collection'})
    },
    created(){
      this.loadEntries(this.$route.params)
      this.loadCharacters(this.$route.params)

    },
    methods: {
      ...mapActions({
        loadEntries: 'entries/init', 
        loadCharacters: 'characters/init',
        newEntry: 'entries/new',  
      })
    }
  }
</script>
