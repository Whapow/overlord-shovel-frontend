<template lang="pug">
  .inventory-panel
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
              item-row.item(v-for="itemSlot in inventory.item_slots", v-if="itemSlots[itemSlot.id]", 
                :key="itemSlot.id", :id="itemSlot.id", :item="items[itemSlots[itemSlot.id].item_id]")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import draggable from 'vuedraggable'
  import itemRow from '~/components/itemRow'

  export default {
    props: ['inventory', 'owner'],
    components: {draggable, itemRow},
    computed: {
      ...mapGetters({
        currentUser: 'session/currentUser',
        items: 'items/collection', 
        itemSlots: 'itemSlots/collection',
      })
    },
    methods:{
      ...mapActions({
        submitItemSlot: 'itemSlots/submit'
      }),
      moveItem(event){
        let {...itemSlot} = this.itemSlots[event.item.id]
        itemSlot.inventory_id = Number(event.to.id)
        this.submitItemSlot({itemSlot})
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

