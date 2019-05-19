<template lang="pug">
  .stack.panel(v-if="stack")
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
      label.label Quantity
      input.input(type='text', v-model.number="formData.quantity", @keyup.enter="save")
      button.btn.btn-light.cancel(@click="cancel") Cancel
      button.btn.btn-primary.save(@click="save") Save
    .display.grid(v-else)
      p.item-name {{ item ? item.name : 'Unknown Item' }}
      button.edit-button(@click="setEditing(true)") Edit
      button.close-button(@click="clearPanel") Close
</template>

s<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { Multiselect } from 'vue-multiselect'

  export default {
    data(){
      return {
        editing: false
      }
    },
    components: { Multiselect },
    computed: {
      ...mapGetters({
        stack: 'stacks/active',
        items: 'items/collection',
        itemOptions: 'items/itemOptions'
      }),
      item(){ return this.stack ? this.items[this.stack.item_id] : {} },
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
        updateStack: 'stacks/update',
        clear: 'stacks/clear',
        removeStack: 'stacks/remove'
      }),
      ...mapActions({
        submitItem: 'stacks/submit',
        // deleteItem: 'stacks/delete'
      }),
      save(){
        if (this.validated){
          if(this.stack.id == 0) {
            // this.submitItem({stack: this.formData})
            // this.removeStack(0)
          } else {
            this.submitItem({stack: this.formData})
            this.setEditing(false)
          }
        }
      },
      cancel(){
        if(this.stack.id == 0){
          this.removeStack(0)
        } else {
          this.setEditing(false)
        }
      },
      clearPanel(){
        this.clear()
        this.setEditing(false)
      }
      // confirmDelete(){
      //   if (confirm("Are you sure?")){
      //     this.deleteItem({stack: this.stack})
      //   }
      // }
    },
    watch: {
      stack: function(){
        if(this.stack && this.stack.id == 0){
          this.setEditing(true)
        } else {
          this.setEditing(false)
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .stack {
    flex-direction: column;
    width: 24rem;
    height: 24rem;
    border: solid;
  }
  .display{
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
    font-size: 1.5rem;
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  .edit-button {
    grid-column: 4;
    grid-row: 1;
  }
  .close-button {
    grid-column: 5;
    grid-row: 1;
  }
  .save{
    grid-column: 3
  }
  .cancel{
    grid-column: 1
  }
</style>
