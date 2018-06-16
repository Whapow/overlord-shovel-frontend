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
        campaign-row(v-for="campaign in campaigns", :key="campaign.id", :campaign="campaign")
        tr
          td(colspan="4")
            a(href="#", @click.prevent="newCampaign") Add New
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import campaignRow from '~/components/campaignRow'

  export default {
    layout: 'default',
    components: {campaignRow},
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
      ...mapActions({newCampaign: 'campaigns/new'})
    }
  }
</script>


