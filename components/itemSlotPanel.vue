<template lang="pug">
  .item-slot.panel(v-if="item")
    .edit.grid(v-if="editing")
      label.label Item
      input.input(type='text', v-model.number="formData.item_id", @keyup.enter="save")
      label.label Inventory
      input.input(type='text', v-model.number="formData.inventory_id", @keyup.enter="save")
      label.label Quantity
      input.input(type='text', v-model.number="formData.quantity", @keyup.enter="save")
      button.btn.btn-light.cancel(@click="cancel") Cancel
      button.btn.btn-primary.save(@click="save") Save
    .display.grid(v-else)
      p.item-name {{ item.name }}
      button.edit-button(@click="setEditing(true)") Edit
</template>

s<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'

  export default {
    data(){
      return {
        selectedItemSlot: {},
        editing: false
      }
    },
    created(){
      this.$nuxt.$on('selectItemSlot', itemSlot => {
        this.selectedItemSlot = itemSlot
        this.editing = false
      })
    },
    computed: {
      ...mapGetters({
        itemSlots: 'itemSlots/collection',
        items: 'items/collection',
      }),
      itemSlot(){ return this.itemSlots[this.selectedItemSlot.id]},
      item(){ return this.items[this.selectedItemSlot.item_id] },
      validated(){
        return (this.formData.item_id && this.formData.inventory_id && this.formData.quantity)
      }
    },
    methods: {
      setEditing(value){
        this.editing = value
        if (value){ this.formData = _.cloneDeep(this.itemSlot) }
      },
      ...mapMutations({
        updateItem: 'itemSlots/update',
        // removeItem: 'itemSlots/remove'
      }),
      ...mapActions({
        submitItem: 'itemSlots/submit',
        // deleteItem: 'itemSlots/delete'
      }),
      save(){
        if (this.validated){
          if(this.itemSlot.id == 0) {
            // this.submitItem({itemSlot: this.formData})
            // this.removeItem(0)
          } else {
            this.updateItem({itemSlot: this.formData})
            this.setEditing(false)
          }
        }
      },
      cancel(){
        if(this.itemSlot.id == 0){
          // this.removeItem(0)
        } else {
          this.setEditing(false)
        }
      },
      // confirmDelete(){
      //   if (confirm("Are you sure?")){
      //     this.deleteItem({itemSlot: this.itemSlot})
      //   }
      // }
    }
  }
</script>


<style lang="scss" scoped>
  .item-slot {
    flex-direction: column;
    width: 16rem;
    height: 24rem;
    border: solid;
    border-color: pink;
  }
  .display{
    border-color: green;
    grid-template-rows: 2rem repeat(5, 1fr);
    grid-template-columns: repeat(3, 1fr) 3rem;
  }
  .edit{
    max-width: 16rem;
    grid-template-columns: 5rem 1rem 7rem 1rem;
    grid-row-gap: 1rem;
  }
  .label {
    justify-self: flex-end;
    grid-column: 1;
  }
  .input {
    grid-column: 3;
    width: 8rem;
  }
  .item-name {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  .edit-button {
    grid-column: 4;
    grid-row: 1;
  }
  .save{
    grid-column: 3
  }
  .cancel{
    grid-column: 1
  }
</style>
