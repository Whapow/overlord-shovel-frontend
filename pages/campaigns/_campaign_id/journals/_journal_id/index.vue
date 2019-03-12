<template lang="pug">
  .journal
    router-link.btn.btn-light(:to="`/campaigns/${campaignId}/journals`") Back to Journals
    h3 {{ campaign.name }} - {{ journal.name }}
    table.table.table-hover
      thead
        tr
          th  Character
          th  Reward Value
          th  Experience
          th
      tbody
        journal-entry-row(v-for="entry in entries", :key="entry.id", :entry="entry")
        tr(v-if="campaign.gm_id && session.user.id == campaign.gm_id")
          td(colspan="4")
            button.btn.btn-light(@click="newEntry") Add New  
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import journalEntryRow from '~/components/journalEntryRow'
  export default {
    components: { journalEntryRow },
    data(){
      return {
        journalId: this.$route.params.journal_id,
        campaignId: this.$route.params.campaign_id
      }
    },
    computed: {
      ...mapGetters({
        entries: 'entries/collection', 
        journals: 'journals/collection', 
        campaigns: 'campaigns/collection', 
        session: 'session'
      }),
      journal(){ return this.journals[this.journalId] || {} },
      campaign(){ return this.campaigns[this.campaignId] || {} }
    },
    created(){
      this.loadEntries(this.$route.params)
      this.loadCharacters(this.$route.params)
      this.init(this.$route.params)
    },
    methods: {
      ...mapActions({
        loadEntries: 'entries/init', 
        loadCharacters: 'characters/init',
        newEntry: 'entries/new',
        init: 'journals/init'
      })
    }
  }
</script>
