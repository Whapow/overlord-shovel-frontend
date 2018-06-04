<template lang='pug'>
  #shiny-pile
    .container
      .row
        .title
          h2 {{ campaign.name }}
          i Drag items to move them to a different inventory. (Temporarily broken)
      .row
        .col-8.shiny-pile-panel
          .header.row
            .col-2
              h4 Unclaimed
            .col-4
              button.btn.btn-light.add-new-item(@click="addItem") Add New Item
          .body
            table.table.table-hover
              tbody
                draggable.draggable(v-model="itemList[null]", :options="{group: 'items'}", :id="null", @end="moveItem")
                  item-row.item(v-for="item in itemList[null]", :id="item.id", :key="item.id", :item="item")        
        .col-4         
          .character-inventory-panel(v-for="character in characters", v-if="character.campaign_id == campaignId")
            .header
              .row
                h4 {{ character.name }}
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

  export default {
    layout: 'default',
    created(){
      this.init();
    },
    components: { draggable, itemRow },
    computed: {
      ...mapGetters({items: 'items/collection'}),
      ...mapFields(['characters', 'campaign', 'campaignId', 'collection']),
      itemList(){ return _.groupBy(this.items, 'character_id') }
    },
    methods: {
      ...mapMutations({
        updateItem: 'items/update',
        removeItem: 'items/remove',
      }),
      ...mapActions({
        init: 'items/init', 
        addItem:'items/new',
        submitItem: 'items/submit'
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
