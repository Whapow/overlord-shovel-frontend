<template lang="pug">
  .journals
    router-link.btn.btn-light(:to="`/`") Back to Campaigns
    h3 {{ campaign.name }} - Journals
    table.table.table-hover
      thead
        tr
          th(colspan="2") Journal Name
      tbody
        journal-row(v-for="journal in journals", :key="journal.id", :journal="journal")
        tr(v-if="campaign && session.user.id == campaign.gm_id")
          td(colspan="2")
            a(href="#", @click.prevent="newJournal") Add New
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'journals/getField'
  }) 

  import JournalRow from '~/components/journalRow'

  export default {
    components: {JournalRow},
    data(){
      return {
        campaignId: this.$route.params.campaign_id
      }
    },
    methods: {
      ...mapActions({
        init: 'journals/init',
        loadCampaigns: 'campaigns/init',
        newJournal: 'journals/new'
      })
    },
    computed:{
      ...mapGetters({
        journals: 'journals/collection', 
        campaigns: 'campaigns/collection', 
        session: 'session'
      }),
      campaign(){ return this.campaigns[this.campaignId] || {} }
    },
    created(){
      this.init(this.$route.params);
      this.loadCampaigns()
    }
  }
</script>

