<template lang='pug'>
  #shiny-pile.flex.shiny-pile
    .flex.info-header
      router-link.btn.btn-light(:to="`/`") Back to Campaigns
      h2.campaign-title {{ campaign.name }}
      i Drag items to move them to a different inventory.
      //- p Total: {{ items | totalValue }}
    .flex.body
      inventory(v-for="inventory in campaign.inventories", 
        :key="inventory.id", :inventoryReference="inventory", :owner="campaign")
      stack-panel
      inventory-deck(:characterCollection="characters(campaign.id)" )
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'

  import _ from 'lodash'
  import itemRow from '~/components/itemRow'
  import inventory from '~/components/inventory'
  import inventoryDeck from '~/components/inventoryDeck'
  import stackPanel from '~/components/stackPanel'

  export default {
    layout: 'default',
    created(){
      this.loadCharacters(this.$route.params)
      this.loadCampaigns(this.$route.params)
      this.loadInventories(this.$route.params)
      this.loadStacks()
      this.loadItems()
    },
    components: { itemRow, inventory, inventoryDeck, stackPanel },
    computed: {
      ...mapGetters({
        campaigns: 'campaigns/collection', 
        characters: 'characters/forCampaign', 
        inventories: 'inventories/collection',
        stacks: 'stacks/collection',
        items: 'items/collection',
      }),
      itemList(){ return _.groupBy(this.items, 'character_id') },
      campaign(){ return this.campaigns[this.$route.params.campaign_id] || {} },
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
        loadCampaigns: 'campaigns/init',
        loadCharacters: 'characters/init',
        loadInventories: 'inventories/init',
        loadStacks: 'stacks/init',
        loadItems: 'items/init',
        addItem:'items/new',
        submitItem: 'items/submit'
      }),
    }, 
  }
</script>

<style scoped>
.shiny-pile {
  width: 100%;
  flex-direction: column;
}
.info-header {
  justify-content: space-between;
}
.body {
  justify-content: space-between;
}
.campaign-title {
  min-width: 10rem
}
.title {
  padding-bottom: 2rem
}
button.add-new-item {
  float: right
}
</style>
