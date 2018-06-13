<template lang='pug'>
  .index
    h3 Campaigns
    table.table.table-hover
      thead
        tr
          th Name
          th GM
          th
      tbody
        tr(v-for="campaign in campaigns", :key="campaign.id")
          td {{ campaign.name }}
          td {{ getPlayerName(campaign.gm_id) }}
          td
            router-link.btn.btn-light(:to="`/campaigns/${campaign.id}/journals`") Journals
            router-link.btn.btn-light(:to="`/campaigns/${campaign.id}/shiny_pile`") Shiny Pile
</template>

<script>
  import mocks from "~/mocks.json"
  import { mapGetters } from 'vuex'

  export default {
    layout: 'default',
    data(){
      return {
        mockApi: mocks.data
      }
    },
    computed: {
      ...mapGetters({campaigns: 'campaigns/collection'})
    },
    methods: {
      getPlayerName(id){
        return this.mockApi.users[id].name
      },
    }
  }
</script>


