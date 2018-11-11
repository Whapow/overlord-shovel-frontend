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
          inventory(v-for="inventory in campaign.inventories", v-if="inventories[inventory.id]"
            :inventory="inventories[inventory.id]", :owner="campaign")
            //- .header.row
            //-   .col-4
            //-     h4 {{ inventories[inventory.id].name }}
            //-   .col-2
            //-     // p {{ inventory | totalValue2 }}g
            //- .body
            //-   table.table.table-hover
            //-     tbody
            //-       //- draggable.draggable(v-model="itemList[campaign.id]", :options="{group: 'items'}", :id="campaign.id", @end="moveItem")
            //-       //-   item-row.item(v-for="item in itemList[campaign.id]", :key="item.id", :id="item.id", :item="item")
            //-       tr(v-for="itemSlot in inventories[inventory.id].item_slots", v-if="itemSlots[itemSlot.id]")
            //-         td {{ items[itemSlots[itemSlot.id].item_id].name }}
            //-         td {{ itemSlots[itemSlot.id].quantity }}
        .col-4
          inventory(v-for="character in characters", v-if="character.campaign_id == campaignId && inventories[character.inventory.id]", 
            :inventory="inventories[character.inventory.id]", :owner="character")
          //- .character-inventory-panel(v-for="character in characters", v-if="character.campaign_id == campaignId && inventories[character.inventory.id]")
          //-   .header
          //-     .row
          //-       .col-6
          //-         h4 {{ inventories[character.inventory.id].name }}
          //-       .col-3
          //-         p {{ itemList[character.id] | totalValue }}g
          //-   .body
          //-       table.table.table-hover
          //-         tbody
          //-           tr(v-for="itemSlot in inventories[character.inventory.id].item_slots", v-if="itemSlots[itemSlot.id]")
          //-             td {{ items[itemSlots[itemSlot.id].item_id].name }}
          //-             td {{ itemSlots[itemSlot.id].quantity }}
          //-           //- draggable.draggable(v-model="itemList[null]", :options="{group: 'items'}", :id="null", @end="moveItem")
          //-           //-   item-row.item(v-for="item in itemList[null]", :key="item.id", :id="item.id", :item="item")            
        //- .col-8.shiny-pile-panel
          .header.row
            .col-4
              h4 Unclaimed
            .col-2
                p {{ itemList[null] | totalValue }}g
            .col-2
              button.btn.btn-light.add-new-item(@click="addItem") Add New Item
          .body
            table.table.table-hover
              tbody
                draggable.draggable(v-model="itemList[null]", :options="{group: 'items'}", :id="null", @end="moveItem")
                  item-row.item(v-for="item in itemList[null]", :id="item.id", :key="item.id", :item="item")        
        //- .col-4         
          .character-inventory-panel(v-for="character in characters", v-if="character.campaign_id == campaignId")
            .header
              .row
                .col-6
                  h4 {{ character.name }}
                .col-3
                  p {{ itemList[character.id] | totalValue }}g
            .body
                table.table.table-hover
                  tbody
                    draggable.draggable(v-model="itemList[character.id]", :options="{group: 'items'}", :id="character.id", @end="moveItem")
                      item-row.item(v-for="item in itemList[character.id]", :key="item.id", :id="item.id", :item="item") 
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'items/getField'
  }) 

  import draggable from 'vuedraggable'
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
    components: { draggable, itemRow, inventory },
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
      totalValue2(inv){ 
        let inventory = this.inventories[inv.id]
        if (inventory){
          let total = 0
          let item_slots = inventory.relationships.item_slots.data
          item_slots.forEach(function(itemSlot){
            let item = this.items[itemSlot.relationships.item.data.id]
            total += Number(itemSlot.quantity * item.value)
          })
        }
        return total
      }
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
      moveItem(event){
        let {...item} = this.collection[event.item.id]
        item.character_id = event.to.id ? Number(event.to.id) : null
        this.submitItem({item})
      }
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
.draggable {
  min-height: 5rem;
  min-width: 10rem;
}
.title {
  padding-bottom: 2rem
}
button.add-new-item {
  float: right
}
</style>
