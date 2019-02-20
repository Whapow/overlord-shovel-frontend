<template lang="pug">
  .inventory-panel
    .container.inventory(v-if="inventory")
      h4 {{ inventory.name }}
      //- p {{ inventory | totalValue }}g
      draggable.container.draggable(@end="moveItem", :value="inventory.item_slots", :options="{group: 'itemSlots'}", :id="inventory.id" )
        item-slot.item(v-for="itemSlot in inventory.item_slots", v-if="itemSlots[itemSlot.id]", 
          :key="itemSlot.id", :id="itemSlot.id", :itemSlotReference="itemSlot")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import draggable from 'vuedraggable'
  import itemRow from '~/components/itemRow'
  import itemSlot from '~/components/itemSlot'

  export default {
    props: ['inventoryReference', 'owner'],
    components: {draggable, itemRow, itemSlot},
    computed: {
      ...mapGetters({
        currentUser: 'session/currentUser',
        items: 'items/collection', 
        itemSlots: 'itemSlots/collection',
        inventories: 'inventories/collection',
      }),
      inventory(){
        return this.inventories[this.inventoryReference.id]
      }
    },
    methods:{
      ...mapActions({
        transferItem: 'inventories/transferItem',
      }),
      moveItem(event){
        if (event.from != event.to){
          let {...itemSlot} = this.itemSlots[event.item.id]
          itemSlot.inventory_id = event.to.id
          this.transferItem({itemSlot, from: event.from.id, to: event.to.id})
        }
      }
    },
    filters: {
      totalValue(inventory){     
        let total = 0
        inventory.item_slots.forEach(function(slot){
          let itemSlot = this.itemSlots[slot.id]
          let item = this.items[itemSlot.item_id]
          total += Number(itemSlot.quantity) * Number(item.value)
        })
        return total
      }
    }
  }
</script>

<style lang="scss" scoped>
  .draggable {
    padding: 0;
    margin: 0;
    list-style: none;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .item {
    min-height: 5rem;
    min-width: 5rem;
    max-height: 5rem;
    max-width: 5rem;
  }
  .inventory {
    flex-direction: column;
  }

</style>

