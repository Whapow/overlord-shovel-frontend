
<template lang="pug">
  #items-index
    h3 Items
    table.table
      thead
        tr
          th Item Name
          th Description
          th Value
          th Consumable?
          th
      tbody
        item-row(v-for="item in items", index="item.id", :item="item")
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import itemRow from '~/components/itemRow'

  export default {
    layout: 'default',
    created(){
      this.init()
    },
    components: {itemRow},
    methods: {
      ...mapActions({
        init: 'items/init'
      })
    },
    computed: {
      ...mapGetters({
        items: 'items/collection'
      })
    }
    
  }
</script>
