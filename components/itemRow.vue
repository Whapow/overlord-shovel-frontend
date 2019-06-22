<template lang='pug'>
  tr.item
    template(v-if="editing")
      td.column
        input(type='text', v-model.trim="formData.name", @keyup.enter="save")
      td.column
        input(type='text', v-model.trim="formData.description")
      td.column
        input(type='text', v-model.number="formData.value", @keyup.enter="save")
      td.column
        input(type="checkbox", v-model="formData.consumable")  
      td
        button.btn.btn-primary(@click="save") Save
        button.btn.btn-light(@click="cancel") Cancel
    template(v-else)
      td.column
        p {{ item.name }}
      td.column
        i {{ item.description }}
      td.column
        p {{ item.value }}
      td.column
        p {{ item.consumable }}  
      td
        button.btn.btn-light(@click="setEditing(true)") Edit
        button.btn.btn-danger(v-if="session.user.id == campaign.gm_id", @click="confirmDelete") Delete
</template>

<script>
  import _ from 'lodash'
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'items/getField'
  }) 

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
    computed: {
      ...mapFields(['campaignId']),
      ...mapGetters({
        campaigns: 'campaigns/collection', 
        session: 'session'
        }),
      campaign(){ return this.campaigns[this.campaignId] || {} }
    },
    methods: {
      setEditing(value){
        this.editing = value
        if (value){ this.formData = _.cloneDeep(this.item) }
      },
      ...mapMutations({
        updateItem: 'items/update',
        removeItem: 'items/remove'
      }),
      ...mapActions({
        submitItem: 'items/submit',
        deleteItem: 'items/delete'
      }),
      save(){
        if (this.formData.name && this.formData.value >= 0 ){
          this.submitItem({item: this.formData})
          if(this.item.id == 0) {
            this.removeItem(0)
          } else {
            this.setEditing(false)
          }
        }
      },
      cancel(){
        if(this.item.id == 0){
          this.removeItem(0)
        } else {
          this.setEditing(false)
        }
      },
      confirmDelete(){
        if (confirm("Are you sure?")){
          this.deleteItem({item: this.item})
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
