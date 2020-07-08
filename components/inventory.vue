<template lang="pug">
  .inventory-panel
    .panel(v-if="inventory")
      .panel-header
        span.inventory-title {{ inventory.name }}
        button(@click="newStack") +
      div.grid.inventory
        div.slot(
          v-for="slotIndex in slotsRequiredForFullRow"
          :key="slotIndex"
          draggable
          @dragstart="startDrag($event,arrangedStacks[slotIndex])"
          @drop='onDrop($event, slotIndex, inventory, arrangedStacks[slotIndex])'
          @dragover.prevent
          @dragenter.prevent
        )
          stack.item.drag-el(
            v-if="arrangedStacks[slotIndex]", 
            :id="arrangedStacks[slotIndex].id", 
            :stackReference="arrangedStacks[slotIndex]"
          )
          div.item(v-else)
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import stack from '~/components/stack'

  export default {
    props: ['inventoryReference', 'owner'],
    components: {stack},
    computed: {
      ...mapGetters({
        currentUser: 'session/currentUser',
        items: 'items/collection', 
        stacks: 'stacks/collection',
        inventories: 'inventories/collection',
      }),
      inventory(){
        return this.inventories[this.inventoryReference.id]
      },
      highestPosition(){
        let highest = 1
        this.inventory.stacks.forEach(stack => { stack.position > highest && (highest = stack.position) })
        return highest
      },
      slotsRequiredForFullRow(){
        return Math.ceil((this.highestPosition + 1) / 5) * 5
      },
      arrangedStacks(){
        let arranged = {}
        this.inventory.stacks.forEach(stack => {return arranged[stack.position] = stack})
        return arranged
      }
    },
    methods:{
      ...mapActions({
        transferItem: 'inventories/transferItem',
        addStack: 'stacks/new',
      }),
      moveItem(event){
        if (event.from != event.to){
          let {...stack} = this.stacks[event.item.id]
          stack.inventory_id = event.to.id
          this.transferItem({stack, from: event.from.id, to: event.to.id})
        }
      },
      newStack(){
        this.addStack(this.inventory)
      },
      startDrag (evt, stack) {
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('stack', JSON.stringify(stack))
      },
      onDrop (evt, position, inventory, existingStack = {}) {
        let movedStack = JSON.parse(evt.dataTransfer.getData('stack'))
        if (_.isEmpty(existingStack)) {
          // Move
          console.log("Move: ", movedStack)
          console.log("To: ", inventory)
          console.log("Position: ", position)
        } else if (existingStack.item_id == movedStack.item_id) {
          // Combine
          console.log("Combine: ", movedStack)
          console.log("With: ", existingStack)
        } else {
          if (inventory.id == movedStack.inventory_id ){
            // Swap
            console.log("Swap: ", movedStack)
            console.log("With: ", existingStack)
          } else {
            // No-op
            console.log("Not Yet Implemented")
          }
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
    overflow: auto;
    height: 25rem;
    padding: 0;
    margin: 0;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(5, 1fr);
    background-color: lightgray;
  }
  .item {
    min-height: 5rem;
    min-width: 5rem;
    max-height: 5rem;
    max-width: 5rem;
    background-color: white;
  }
  .inventory-title {
    font-size: 1.5rem;
  }
</style>

