<template lang='pug'>
  .shiny-pile
    .shiny-pile-panel
      .header
        h2 {{ mockApi.campaigns[campaignId].name }}
        i Drag items to move them to a different inventory.
      .body
        h4 Unclaimed
        table
          tbody
            draggable.draggable(v-model="items[null]", :options="{group: 'items'}", @start="drag=true" @end="drag=false")
              tr.item(v-for="item in items[null]")
                td.column
                  p {{ item.name }}
                td.column
                  i {{ item.description }}
                td.column
                  p {{ item.value }}
    .character-inventory-panel(v-for="character in mockApi.characters", v-if="character.campaign_id == campaignId")
      .header
        h4 {{ character.name }}
      .body
        table
          tbody
            draggable.draggable(v-model="items[character.id]", :options="{group: 'items'}", @start="drag=true" @end="drag=false")
              tr.item(v-for="item in items[character.id]") 
                td.column
                  p {{ item.name }}
                td.column
                  i {{ item.description }}
                td.column
                  p {{ item.value }}

</template>

<script>
  import mocks from "~/mocks.json"
  import groupBy from 'lodash/groupBy'
  import cloneDeep from 'lodash/cloneDeep'
  import draggable from 'vuedraggable'

  export default {
    layout: 'default',
    data(){
      return {
        mockApi: mocks,
        campaignId: this.$nuxt.$route.path.split('/')[2],
        items: {}
      }
    },
    components: { draggable },
    created(){
      //  = Object.values(mocks.items).filter(item => { return item.campaign_id == this.campaignId })
      this.items = groupBy(groupBy(this.mockApi.items, 'campaign_id')[this.campaignId] , 'character_id')
    },
    methods: {
      getCharacterName(id){
        if (id){
          return this.mockApi.characters[id].name
        } else {
          return "None"
        }
      },
    }, 
  }
</script>

<style scoped>
.shiny-pile-panel {
  max-width: 50%;
  min-width: 500rem
}
.character-inventory-panel {
  width: 50%
}
.column {
  padding-left: 1rem
}
.draggable {
  min-height: 5rem;
  min-width: 10rem;
}
</style>
