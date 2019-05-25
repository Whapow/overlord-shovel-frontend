<template lang="pug">
  .stack.panel(v-if="stack")
    .edit.grid(v-if="editing")
      label.item Item
      template(v-if="itemForm")
        item-form(v-model="formData.item")
        button.top-right(@click="setItemForm(false)") X
      template(v-else)
        multiselect(
          v-model="formData.item",
          :options="itemOptions", 
          :close-on-select="true"
          label="name"
          track-by="id"
        ).input
        button.top-right(@click="setItemForm(true)") +
      label.quantity Quantity
      input.input(type='text', v-model.number="formData.quantity", @keyup.enter="save")
      .footer-row.flex
        button.btn.btn-light.cancel(@click="cancel") Cancel
        button.btn.btn-primary.save(@click="save") Save
    .show.grid(v-else)
      p.item-name {{ item ? item.name : 'Unknown Item' }}
      button.edit-button(@click="setEditing(true)") Edit
      button.close-button(@click="clearPanel") Close
      label(style="padding-right: 1rem") Value:
      span {{ item.value * stack.quantity }}
      label(style="padding-right: 1rem") Quantity:
      span {{ stack.quantity }}
      label(style="padding-right: 1rem") Description:
      span.description {{ item.description }}

</template>

s<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { Multiselect } from 'vue-multiselect'
  import itemForm from '~/components/itemForm'

  export default {
    data(){
      return {
        formData: {},
        editing: false,
        itemForm: false
      }
    },
    components: { Multiselect, itemForm },
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
          form.inventory_id != null && 
          form.quantity != null
        )
      }
    },
    methods: {
      setEditing(value){
        this.editing = value
        this.setItemForm(false)
        if (value){ 
          this.formData = _.cloneDeep(this.stack) 
          this.formData.item = this.item
        }
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
          this.submitItem({stack: this.formData})
          if(this.stack.id == 0) {
            this.removeStack(0)
          } else {
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
      },
      setItemForm(value){
        this.itemForm = value
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
  .stack {
    flex-direction: column;
    width: 24rem;
    height: 24rem;
    border: solid;
  }
  .item-name {
    font-size: 1.5rem;
    grid-column: 1 / 4;
    grid-row: 1 / 3;
    margin-bottom: 0px;
  }
  .show{
    grid-template-rows: 2rem, 1fr repeat(4, 2rem);
    grid-template-columns: repeat(3, 1fr) 3rem;
    align-content: center;
  }
  .edit-button {
    grid-column: 4;
    grid-row: 1;
  }
  .close-button {
    grid-column: 5;
    grid-row: 1;
  }
  .edit{
    grid-template-columns: 4rem 1fr 1.5rem;
    grid-template-rows: repeat(3, 3rem);
    grid-gap: 1rem;
    justify-items: start;
  }
  .top-right{
    grid-column-start: 3;
  }
  label {
    grid-column-start: 1;
    justify-self: end;
    align-self: center;
  }
  .item {
    grid-row-start: 1;
  }
  .quantity {
    grid-row-start: 2;
  }
  .input {
    grid-column-start: 2;
    max-height: 2rem;
  }
  .footer-row {
    justify-content: space-around;
    grid-row-start: 3;
    grid-column-start: 2;
  }
  .description {
    grid-column: 2 / 6;
    grid-row: 5 / 7;
  }
</style>
