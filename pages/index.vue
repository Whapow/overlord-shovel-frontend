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
          td {{ campaign.gm_id | playerName }}
          td
            router-link.btn.btn-light(:to="`/campaigns/${campaign.id}/journals`") Journals
            router-link.btn.btn-light(:to="`/campaigns/${campaign.id}/shiny_pile`") Shiny Pile
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    layout: 'default',
    computed: {
      ...mapGetters({campaigns: 'campaigns/collection', users: 'users/collection'})
    },
    filters: {
      playerName(id){
        return this.users[id].name
      },
    }
  }
</script>


