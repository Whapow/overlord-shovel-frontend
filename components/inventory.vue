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
          @dragstart="startDrag($event,arrangedStacks[slotIndex])"
          @drop.prevent='onDrop($event, slotIndex, inventory.id, arrangedStacks[slotIndex])'
          @dragover.prevent
          @dragenter.prevent
        )
          stack.item.drag-el(
            draggable
            v-if="isSlotFilled(slotIndex)", 
            :id="arrangedStacks[slotIndex].id", 
            :stackReference="arrangedStacks[slotIndex]"
          )
          div.empty(v-else)
        div.slot(
          v-for="stack in arrangedStacks['unsorted']"
          :key="stack.id"
          @dragstart="startDrag($event,stack)"
          @drop.prevent
          @dragover.prevent
          @dragenter.prevent
        )
          stack.item.loose.drag-el(
            draggable
            :id="stack.id", 
            :stackReference="stack"
          )
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
        let arranged = { ['unsorted']: [] }
        this.inventory.stacks.forEach(stack => {
          if (!!stack.position) {
            return arranged[stack.position] = stack
          } else {
            return arranged['unsorted'].push(stack)
          }
        })
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
        if (!_.isEmpty(stack)){
          evt.dataTransfer.dropEffect = 'move'
          evt.dataTransfer.effectAllowed = 'move'
          evt.dataTransfer.setData('stack', JSON.stringify(stack))
        }
      },
      onDrop (evt, position, inventory_id, existingStack = {}) {
        let event = evt.dataTransfer.getData('stack')
        if (!_.isEmpty(event)){
          let movedStack = JSON.parse(event)
          let from = movedStack.inventory_id
          let to = inventory_id
          if (_.isEmpty(existingStack)) {
            this.transferItem({stack: Object.assign(movedStack, {position, inventory_id}), from, to})
          } else if (existingStack.item_id == movedStack.item_id) {
            // Combine
            console.log("Combine: ", movedStack)
            console.log("With: ", existingStack)
          } else {
            if (inventory_id == movedStack.inventory_id ){
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
      isSlotFilled(index){
        return !_.isEmpty(this.arrangedStacks[index])
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
  .slot {
    min-height: 5rem;
    min-width: 5rem;
    max-height: 5rem;
    max-width: 5rem;
    background-color: lightgrey;
  }
  .item {
    min-height: 4.5rem;
    min-width: 4.5rem;
    max-height: 4.5rem;
    max-width: 4.5rem;
    margin: 0.25rem;
    background-color: white;
    border-color: grey;
  }
  .loose {
    border-color: grey;
  }
  .empty{
    min-height: 4.5rem;
    min-width: 4.5rem;
    max-height: 4.5rem;
    max-width: 4.5rem;
    margin: 0.25rem;
    background-color: grey;
  }
  .inventory-title {
    font-size: 1.5rem;
  }
</style>

