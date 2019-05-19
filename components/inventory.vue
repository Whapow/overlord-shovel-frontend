<template lang="pug">
  .inventory-panel
    .panel(v-if="inventory")
      .panel-header
        span.inventory-title {{ inventory.name }}
      //- p {{ inventory | totalValue }}g
      draggable.grid.inventory(@end="moveItem", :value="inventory.stacks", :options="{group: 'stacks'}", :id="inventory.id" )
        stack.item(v-for="stack in inventory.stacks", v-if="stacks[stack.id]", 
          :key="stack.id", :id="stack.id", :stackReference="stack")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import draggable from 'vuedraggable'
  import itemRow from '~/components/itemRow'
  import stack from '~/components/stack'

  export default {
    props: ['inventoryReference', 'owner'],
    components: {draggable, itemRow, stack},
    computed: {
      ...mapGetters({
        currentUser: 'session/currentUser',
        items: 'items/collection', 
        stacks: 'stacks/collection',
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
          let {...stack} = this.stacks[event.item.id]
          stack.inventory_id = event.to.id
          this.transferItem({stack, from: event.from.id, to: event.to.id})
        }
      }
    },
    filters: {
      totalValue(inventory){     
        let total = 0
        inventory.stacks.forEach(function(targetStack){
          let stack = this.stacks[targetStack.id]
          let item = this.items[stack.item_id]
          total += Number(stack.quantity) * Number(item.value)
        })
        return total
      }
    }
  }
</script>

<style lang="scss" scoped>
  .inventory-panel {
    border-style: solid;
  }
  .inventory {
    padding: 0;
    margin: 0;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }
  .item {
    min-height: 5rem;
    min-width: 5rem;
    max-height: 5rem;
    max-width: 5rem;
  }
  .inventory-title {
    font-size: 1.5rem;
  }

</style>

