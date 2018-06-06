<template lang="pug">
  .journals
    router-link.btn.btn-light(:to="`/`") Back to Campaigns
    h3 {{ campaign.name }} - Journals
    table.table.table-hover
      thead
        tr
          th Journal Name
      tbody
        tr(v-for="journal in journals")
          td
            router-link(:to="`/campaigns/${campaign.id}/journals/${journal.id}/`") {{ journal.name }}
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

  export default {
    methods: {
      ...mapActions({
        init: 'journals/init',
        newJournal: 'journals/new'
      })
    },
    computed:{
      ...mapGetters({journals: 'journals/collection'}),
      ...mapFields(['campaign'])
    },
    mounted(){
      this.init($nuxt.$route.path);
    }
  }
</script>

