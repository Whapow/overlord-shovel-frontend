<template lang="pug">
  .item-slot-panel
    .item-slot-display.grid(v-if="item")
      p.item-name {{ item.name }}
      button.edit-button Edit
</template>

s<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'

  export default {
    data(){
      return {
        selectedItemSlot: {}
      }
    },
    created(){
      this.$nuxt.$on('selectItemSlot', itemSlot => {
        this.selectedItemSlot = itemSlot
      })
    },
    computed: {
      ...mapGetters({
        itemSlots: 'itemSlots/collection',
        items: 'items/collection',
      }),
      itemSlot(){ return this.itemSlots[this.selectedItemSlot.id]},
      item(){ return this.items[this.selectedItemSlot.item_id] }
      // validated(){
      //   return this.formData.item_id
      // }
    },
    // methods: {
    //   setEditing(value){
    //     this.editing = value
    //     if (value){ this.formData = _.cloneDeep(this.itemSlot) }
    //   },
    //   ...mapMutations({
    //     updateItem: 'itemSlots/update',
    //     removeItem: 'itemSlots/remove'
    //   }),
    //   ...mapActions({
    //     submitItem: 'itemSlots/submit',
    //     deleteItem: 'itemSlots/delete'
    //   }),
    //   save(){
    //     if (validated){
    //       if(this.itemSlot.id == 0) {
    //         this.submitItem({itemSlot: this.formData})
    //         this.removeItem(0)
    //       } else {
    //         this.updateItem({itemSlot: this.formData})
    //         this.setEditing(false)
    //       }
    //     }
    //   },
    //   cancel(){
    //     if(this.itemSlot.id == 0){
    //       this.removeItem(0)
    //     } else {
    //       this.setEditing(false)
    //     }
    //   },
    //   confirmDelete(){
    //     if (confirm("Are you sure?")){
    //       this.deleteItem({itemSlot: this.itemSlot})
    //     }
    //   }
    // }
  }
</script>


<style lang="scss" scoped>
  .item-slot-panel {
    flex-direction: column;
    width: 16rem;
    height: 24rem;
    border: solid;
    border-color: pink;
  }
  .item-slot-display {
    border-color: green;
    grid-template-rows: 2rem repeat(5, 1fr);
    grid-template-columns: repeat(3, 1fr) 3rem;
  }
  .item-name {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  .edit-button {
    grid-column: 4;
    grid-row: 1;
  }
</style>
