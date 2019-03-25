<template lang='pug'>
  li.item-slot.grid(v-if="itemSlot", @click="selectItem", :class=`selected ? 'active' : ''`)
    p.item-name(v-if="item") {{ item.name }}
    p.item-quantity {{ itemSlot.quantity}}
</template>

<script>
  import _ from 'lodash'
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'itemSlots/getField'
  }) 

  export default {
    props: ['itemSlotReference'],
    data(){
      return {
        selected: false
      }
    },
    computed: {
      ...mapGetters({ 
        currentUser: 'session/currentUser',
        itemSlots: 'itemSlots/collection',
        items: 'items/collection'
      }),
      itemSlot(){ return this.itemSlots[this.itemSlotReference.id] },
      item(){ return this.items[this.itemSlot.item_id] }
    },
    methods: {
      selectItem(){
        this.$nuxt.$emit('selectItemSlot', this.itemSlot)
        this.selected = true
        this.$nuxt.$on('selectItemSlot', itemSlot => {
          this.selected = false
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .item-slot {
    border-color: black;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(5, 1fr);
    &.active{
      background-color: lightgray;
      border-color: orange;
    }
  }
  .item-name {
    grid-column: 1 / 4;
    grid-row: 1 / 5;
  }
  .item-quantity {
    grid-column: 5;
    grid-row: 5;
    text-align: right;
    color: grey;
    margin-bottom: 0px;
  }
</style>
