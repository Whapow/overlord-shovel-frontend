<template lang='pug'>
  li.item-slot.grid(v-if="itemSlot")
    p.item-name(v-if="item") {{ item.name }}
    button.item-menu()
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
        editing: false
      }
    },
    created(){
      if (this.itemSlot.id == 0){this.setEditing(true)}
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
      setEditing(value){
        this.editing = value
        if (value){ this.formData = _.cloneDeep(this.itemSlot) }
      },
      ...mapMutations({
        updateItem: 'itemSlots/update',
        removeItem: 'itemSlots/remove'
      }),
      ...mapActions({
        submitItem: 'itemSlots/submit',
        deleteItem: 'itemSlots/delete'
      }),
      save(){
        if (this.formData.name && this.formData.description && this.formData.value >= 0 ){
          if(this.itemSlot.id == 0) {
            this.submitItem({itemSlot: this.formData})
            this.removeItem(0)
          } else {
            this.updateItem({itemSlot: this.formData})
            this.setEditing(false)
          }
        }
      },
      cancel(){
        if(this.itemSlot.id == 0){
          this.removeItem(0)
        } else {
          this.setEditing(false)
        }
      },
      confirmDelete(){
        if (confirm("Are you sure?")){
          this.deleteItem({itemSlot: this.itemSlot})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.item-slot {
  border-color: black;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(5, 1fr);
}
.item-name {
  grid-column: 1 / 4;
  grid-row: 1 / 5;
}
.item-menu {
  grid-column: 5;
  grid-row: 1;
  width: 1rem;
  height: 1rem;
}
.item-quantity {
  grid-column: 5;
  grid-row: 5;
  text-align: right;
  color: grey;
  margin-bottom: 0px;
}
</style>
