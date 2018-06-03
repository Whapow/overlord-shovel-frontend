<template lang='pug'>
  .shiny-pile
    .shiny-pile-panel
      .header
        h2 {{ campaigns[campaignId].name }}
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
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'items/getField'
  }) 

  import draggable from 'vuedraggable'

  export default {
    layout: 'default',
    created(){
      this.init();
    },
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
.column {
  padding-left: 1rem
}
.draggable {
  min-height: 5rem;
  min-width: 10rem;
}
</style>
