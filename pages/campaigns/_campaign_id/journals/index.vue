<template lang="pug">
  .journals
    router-link.btn.btn-light(:to="`/`") Back to Campaigns
    h3 {{ campaign.name }} - Journals
    table.table.table-hover
      thead
        tr
          th Journal Name
      tbody
        journal-row(v-for="journal in journals", :key="journal.id", :journal="journal")
        tr
          td
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
        newJournal: 'journals/new'
      })
    },
    computed:{
      ...mapGetters({journals: 'journals/collection', campaigns: 'campaigns/collection'}),
      campaign(){ return this.campaigns[this.campaignId] || {} }
    },
    created(){
      this.init(this.$route.params);
    }
  }
</script>

