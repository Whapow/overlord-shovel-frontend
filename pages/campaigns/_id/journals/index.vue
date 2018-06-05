<template lang="pug">
  .journals
    router-link.btn.btn-light(:to="`/`") Back to Campaigns
    h3 {{ campaign.name }} - Journals
    table.table.table-hover
      thead
        tr
          th Journal Name
      tbody
        tr(v-for="journalId in campaign.journals")
          td
            router-link(:to="`/campaigns/${campaign.id}/journals/${journalId}/`") {{ journals[journalId].name }}
</template>

<script>
  import mocks from "~/mocks.json"
  export default {
    data(){
      return {
        journals: mocks.data.journals,
        campaign: {
          id: null,
          journals: []
        }
      }
    },
    mounted(){
      this.campaign = mocks.data.campaigns[$nuxt.$route.path.split('/')[2]]
    }
  }
</script>

