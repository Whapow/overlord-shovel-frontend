<template lang="pug">
  .journal
    router-link.btn.btn-light(:to="`/campaigns/${campaign.id}/journals`") Back to Journals
    table.table.table-hover
      thead
        tr
          th  Character
          th  Reward Value
          th  Experience
      tbody
        journal-entry-row(v-for="entry in journal.entries", :key="entry.id", :entry="entry")  
</template>

<script>
  import journalEntryRow from '~/components/journalEntryRow.vue'
  export default {
    components: { journalEntryRow },
    data(){
      return {
        campaign: {
          id: null
        },
        journal: {
          entries: [1,2,3,4]
        }
      }
    },
    mounted(){
      this.campaign.id = $nuxt.$route.path.split('/')[2]
    }
  }
</script>
