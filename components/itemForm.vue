<template lang="pug">
  .item-creation.grid
    label Name
    input(type='text', v-model.trim="formData.name", @input="updateItem")

    label Value
    input(type='number', v-model.number="formData.value", @input="updateItem")
    //- label.label Consumable?
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  export default {
    props: ['value'],
    data(){
      return {
        formData: {
          id: 0
        }
      }
    },
    methods: {
      updateItem() {
        this.$emit('input', this.formData)
      }
    }
  }
</script>

<style scoped>
  .item-creation {
    grid-template-rows: 1.5rem 1.5rem;
    grid-template-columns: 3rem 1fr;
    background-color: lightgray;
  }
  label {
    grid-column-start: 1
  }
  input {
    grid-column-start: 2
  }

</style>
