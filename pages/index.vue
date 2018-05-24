<template lang='pug'>
  .index
    h3 Campaigns
    table
      thead
        tr
          th Name
          th GM
      tbody
        tr(v-for="campaign in mockApi.campaigns", :key="campaign.id")
          td 
            router-link(:to="`/campaigns/${campaign.id}/shiny_pile`") {{ campaign.name }}
          td {{ getPlayerName(campaign.gm_id) }}
</template>

<script>
  import mocks from "~/mocks.json"
  export default {
    layout: 'default',
    data(){
      return {
        mockApi: mocks
      }
    },
    methods: {
      getPlayerName(id){
        return this.mockApi.users[id].name
      },
    },
  }
</script>


