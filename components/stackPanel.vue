<template lang="pug">
  .stack.panel(v-if="item")
    .edit.grid(v-if="editing")
      label.label Item
      //- input.input(type='text', v-model.number="formData.item_id", @keyup.enter="save")
      multiselect.input(
        v-model="formData.item_id",
        :options="itemOptions", 
        :close-on-select="true"
        label='name'
        track-by='name'
        )
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
  import { Multiselect } from 'vue-multiselect'

  export default {
    data(){
      return {
        selectedStack: {},
        editing: false
      }
    },
    created(){
      this.$nuxt.$on('selectStack', stack => {
        this.selectedStack = stack
        this.editing = false
      })
    },
    components: { Multiselect },
    computed: {
      ...mapGetters({
        stacks: 'stacks/collection',
        items: 'items/collection',
        itemOptions: 'items/itemOptions'
      }),
      stack(){ return this.stacks[this.selectedStack.id]},
      item(){ return this.items[this.selectedStack.item_id] },
      validated(){
        let form = this.formData
        return (
          form.item_id && 
          form.inventory_id && 
          form.quantity
        )
      }
    },
    methods: {
      setEditing(value){
        this.editing = value
        if (value){ this.formData = _.cloneDeep(this.stack) }
      },
      ...mapMutations({
        updateItem: 'stacks/update',
        // removeItem: 'stacks/remove'
      }),
      ...mapActions({
        submitItem: 'stacks/submit',
        // deleteItem: 'stacks/delete'
      }),
      save(){
        if (this.validated){
          if(this.stack.id == 0) {
            // this.submitItem({stack: this.formData})
            // this.removeItem(0)
          } else {
            this.submitItem({stack: this.formData})
            this.setEditing(false)
          }
        }
      },
      cancel(){
        if(this.stack.id == 0){
          // this.removeItem(0)
        } else {
          this.setEditing(false)
        }
      },
      // confirmDelete(){
      //   if (confirm("Are you sure?")){
      //     this.deleteItem({stack: this.stack})
      //   }
      // }
    }
  }
</script>


<style lang="scss" scoped>
  .stack {
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
