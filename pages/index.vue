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
        tr(v-if="session.active")
          td(colspan="4")
            a(href="#", @click.prevent="newCampaign") Add New
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import campaignRow from '~/components/campaignRow'

  export default {
    layout: 'default',
    created(){
      if (this.session.active){
        this.loadCampaigns()
        this.loadUsers()
      }
    },
    components: {campaignRow},
    computed: mapGetters({
      campaigns: 'campaigns/collection', 
      session: 'session'
    }),
    methods: mapActions({loadCampaigns: 'campaigns/init', loadUsers: 'users/init', newCampaign: 'campaigns/new'})
  }
</script>