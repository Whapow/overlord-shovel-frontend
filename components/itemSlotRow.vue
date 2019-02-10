<template lang='pug'>
  tr.itemSlot(v-if="campaign")
    template(v-if="editing")
      td.column
        input(type='text', v-model.trim="formData.name")
      td.column
        input(type='text', v-model.trim="formData.description")
      td.column
        input(type='text', v-model.number="formData.value")
      td
        button.btn.btn-primary(@click="save") Save
        button.btn.btn-light(@click="cancel") Cancel
    template(v-else)
      td.column
        p {{ itemSlot.item.name }}
      td.column
        i {{ itemSlot.item.description }}
      td.column
        p {{ itemSlot.item.value }}
      td
        button.btn.btn-light(@click="setEditing(true)") Edit
        template(v-if="currentUser.id == campaign.gm_id")
          button.btn.btn-danger(@click="confirmDelete") Delete
</template>

<script>
  import _ from 'lodash'
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  const { mapFields } = createHelpers({
    getterType: 'itemSlots/getField'
  }) 

  export default {
    props: ['itemSlot'],
    data(){
      return {
        editing: false
      }
    },
    created(){
      if (this.itemSlot.id == 0){this.setEditing(true)}
    },
    computed: {
      ...mapFields(['campaignId']),
      ...mapGetters({campaigns: 'campaigns/collection', currentUser: 'session/currentUser'}),
      campaign(){ return this.campaigns[this.campaignId] }
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
.column {
  padding-left: 1rem
}
</style>
