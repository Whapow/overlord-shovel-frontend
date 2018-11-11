<template lang='pug'>
  #shiny-pile
    .container
      .row
        .title
          router-link.btn.btn-light(:to="`/`") Back to Campaigns
          h2 {{ campaign.name }}
          i Drag items to move them to a different inventory.
          p Total: {{ items | totalValue }}
      .row
        .col-8.shiny-pile.panel
          inventory(v-for="inventory in campaign.inventories", v-if="inventories[inventory.id]",
            :key="inventory.id", :inventory="inventories[inventory.id]", :owner="campaign")
        .col-4
          inventory(v-for="character in characters", v-if="character.campaign_id == campaignId && inventories[character.inventory.id]", 
            :key="character.inventory.id", :inventory="inventories[character.inventory.id]", :owner="character")
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'items/getField'
  }) 

  import _ from 'lodash'
  import itemRow from '~/components/itemRow'
  import inventory from '~/components/inventory'

  export default {
    layout: 'default',
    created(){
      this.init(this.$route.params);
      this.loadCharacters(this.$route.params)
      this.loadInventories(this.$route.params)
      this.loadItemSlots(this.$route.params)
    },
    components: { itemRow, inventory },
    computed: {
      ...mapGetters({
        items: 'items/collection', 
        campaigns: 'campaigns/collection', 
        characters: 'characters/collection', 
        inventories: 'inventories/collection',
        itemSlots: 'itemSlots/collection',
      }),
      ...mapFields(['campaignId', 'collection']),
      itemList(){ return _.groupBy(this.items, 'character_id') },
      campaign(){ return this.campaigns[this.campaignId] || {} }
    },
    filters: {
      totalValue(collection){ 
        let total = 0
        if (collection){
          let array = Object.values(collection)
          array.forEach(function(obj){
            total += Number(obj.value)
          })
        }
        return total
      },
    },
    methods: {
      ...mapMutations({
        updateItem: 'items/update',
        removeItem: 'items/remove',
      }),
      ...mapActions({
        init: 'items/init', 
        addItem:'items/new',
        submitItem: 'items/submit',
        loadCharacters: 'characters/init',
        loadInventories: 'inventories/init',
        loadItemSlots: 'itemSlots/init'
      }),
    }, 
  }
</script>

<style scoped>
.shiny-pile-panel {
  width: 100%;
}
.character-inventory-panel {
  width: 100%
}
.title {
  padding-bottom: 2rem
}
button.add-new-item {
  float: right
}
</style>
