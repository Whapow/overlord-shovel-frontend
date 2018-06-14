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
          td {{ playerName(campaign.gm_id) }}
          td
            router-link.btn.btn-light(:to="`/campaigns/${campaign.id}/journals`") Journals
            router-link.btn.btn-light(:to="`/campaigns/${campaign.id}/shiny_pile`") Shiny Pile
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    layout: 'default',
    data(){
      return {
        campaignId: this.$route.params.campaign_id
      }
    },
    computed: {
      ...mapGetters({campaigns: 'campaigns/collection'}),
      users(){return {1:{name: 'Joshua'}, 2:{name: "Jessica"}, 3:{name: "Evan"}, 4:{name: "Weston"} }},
      campaign(){ return this.campaigns[this.campaignId] }
    },
    methods: {
      playerName(id){
        return this.users[id].name
      },
    }
  }
</script>


