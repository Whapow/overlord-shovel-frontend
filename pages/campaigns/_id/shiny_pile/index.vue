<template lang='pug'>
  .shiny-pile
    h3 Shiny Pile Here
    table
      thead
        tr
          th Name
          th Owned By
      tbody
        tr(v-for="item in items")
          td {{ item.name }}
          td {{ getCharacterName(item.character_id) }}
</template>

<script>
  import mocks from "~/mocks.json"
  export default {
    layout: 'default',
    data(){
      return {
        mockApi: mocks,
        campaignId: 3,
        items: []
      }
    },
    created(){
      this.items = Object.values(mocks.items).filter(item => { return item.campaign_id == this.campaignId })
    },
    methods: {
      getCharacterName(id){
        if (id){
          return this.mockApi.characters[id].name
        } else {
          return "None"
        }
      },
    }
  }
</script>