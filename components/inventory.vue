<template lang="pug">
  .inventory-panel
    .header
      .row
        .col-6
          h4 {{ inventory.name }}
        .col-3
          //- p {{ itemList[character.id] | totalValue }}g
    .body
        table.table.table-hover
          tbody
            tr(v-for="itemSlot in inventory.item_slots", v-if="itemSlots[itemSlot.id]")
              td {{ items[itemSlots[itemSlot.id].item_id].name }}
              td {{ itemSlots[itemSlot.id].quantity }}
            //- draggable.draggable(v-model="itemList[null]", :options="{group: 'items'}", :id="null", @end="moveItem")
            //-   item-row.item(v-for="item in itemList[null]", :key="item.id", :id="item.id", :item="item") 
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['inventory', 'owner'],
    computed: {
      ...mapGetters({
        currentUser: 'session/currentUser',
        items: 'items/collection', 
        itemSlots: 'itemSlots/collection',
      }),
    },
  }
</script>
