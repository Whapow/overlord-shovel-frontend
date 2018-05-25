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
    .shiny-pile-panel
      .header
        h2 {{ mockApi.campaigns[campaignId].name }}
      .body
        p(v-for="item in items", v-if="item.character_id === null") {{ item.name }}
    .character-inventory-panel(v-for="character in mockApi.characters", v-if="character.campaign_id == campaignId")
      .header
        h4 {{ character.name }}
      .body
        .item(v-for="item in items", v-if="item.character_id == character.id") 
          p {{ item.name }}
          i {{ item.description }}

</template>

<script>
  import mocks from "~/mocks.json"
  export default {
    layout: 'default',
    data(){
      return {
        mockApi: mocks,
        campaignId: this.$nuxt.$route.path.split('/')[2],
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

<style scoped>
.shiny-pile-panel {
  width: 50%
}
.character-inventory-panel {
  width: 50%
}
</style>
