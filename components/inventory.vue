<template lang="pug">
  .inventory-panel
    .container(v-if="inventory")
      .header
        .row
          .col-6
            h4 {{ inventory.name }}
          .col-3
            //- p() {{ inventory | totalValue }}g
      .body
          table.table.table-hover
            tbody
              draggable.draggable(:value="inventory.item_slots", :options="{group: 'itemSlots'}", :id="inventory.id", @end="moveItem")
                item-slot-row.item(v-for="itemSlot in inventory.item_slots", v-if="itemSlots[itemSlot.id]", 
                  :key="itemSlot.id", :id="itemSlot.id", :itemSlot="itemSlots[itemSlot.id]")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import draggable from 'vuedraggable'
  import itemRow from '~/components/itemRow'
  import itemSlotRow from '~/components/itemSlotRow'

  export default {
    props: ['inventoryReference', 'owner'],
    components: {draggable, itemRow, itemSlotRow},
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
    min-height: 5rem;
    min-width: 10rem;
  }

</style>

