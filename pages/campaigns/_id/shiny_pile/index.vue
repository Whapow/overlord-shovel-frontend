<template lang='pug'>
  .shiny-pile
    button(@click="addItem") Add New Item
    .shiny-pile-panel
      .header
        h2 {{ campaigns[campaignId].name }}
        i Drag items to move them to a different inventory.
      .body
        h4 Unclaimed
        table
          tbody
            draggable.draggable(v-model="items[null]", :options="{group: 'items'}", @start="drag=true" @end="drag=false")
              item-row.item(v-for="item in items[null]", :key="item.id", :item="item")
    .character-inventory-panel(v-for="character in characters", v-if="character.campaign_id == campaignId")
      .header
        h4 {{ character.name }}
      .body
        table
          tbody
            draggable.draggable(v-model="items[character.id]", :options="{group: 'items'}", @start="drag=true" @end="drag=false")
              item-row.item(v-for="item in items[character.id]", :key="item.id", :item="item") 
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'items/getField'
  }) 

  import draggable from 'vuedraggable'
  import itemRow from '~/components/itemRow'

  export default {
    layout: 'default',
    created(){
      this.init();
    },
    components: { draggable, itemRow },
    computed: {
      ...mapGetters({items: 'items/collection'}),
      ...mapFields(['characters', 'campaigns', 'campaignId'])
    },
    methods: {
      ...mapMutations({
        updateItem: 'items/update',
        removeItem: 'items/remove',
      }),
      ...mapActions({
        init: 'items/init', 
        addItem:'items/new'}),
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
.draggable {
  min-height: 5rem;
  min-width: 10rem;
}
</style>
