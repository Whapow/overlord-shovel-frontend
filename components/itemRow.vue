<template lang='pug'>
  tr.item
    template(v-if="editing")
      td.column
        input(type='text', v-model="item.name")
      td.column
        input(type='text', v-model="item.description")
      td.column
        input(type='text', v-model.number="item.value")
      td
        button() Save
        button(@click="cancel") Cancel
    template(v-else)
      td.column
        p {{ item.name }}
      td.column
        i {{ item.description }}
      td.column
        p {{ item.value }}
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    props: ['item'],
    data(){
      return {
        editing: false
      }
    },
    created(){
      if (this.item.id == 0){this.setEditing(true)}
    },
    methods: {
      setEditing(value){
        this.editing = value 
      },
      ...mapMutations({
        updateItem: 'items/update',
        removeItem: 'items/remove'
      }),
      cancel(){
        if(this.item.id == 0){
          this.removeItem(0)
        } else {
          setEditing(false)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.column {
  padding-left: 1rem
}
</style>
