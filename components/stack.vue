<template lang='pug'>
  li.stack.grid(v-if="stack", @click="selectItem", :class=`selected ? 'active' : ''`)
    p.item-name(v-if="item") {{ item.name }}
    p.item-quantity {{ stack.quantity}}
</template>

<script>
  import _ from 'lodash'
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'stacks/getField'
  }) 

  export default {
    props: ['stackReference'],
    data(){
      return {
        selected: false
      }
    },
    computed: {
      ...mapGetters({ 
        currentUser: 'session/currentUser',
        stacks: 'stacks/collection',
        items: 'items/collection'
      }),
      stack(){ return this.stacks[this.stackReference.id] },
      item(){ return this.items[this.stack.item_id] }
    },
    methods: {
      selectItem(){
        this.$nuxt.$emit('selectStack', this.stack)
        this.selected = true
        this.$nuxt.$on('selectStack', stack => {
          this.selected = false
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .stack {
    border-color: grey;
    border-style: solid;
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
