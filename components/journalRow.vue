<template lang="pug">
  tr.journal
    template(v-if="editing")
      td.column
        input(type='text', v-model.trim="formData.name", @keyup.enter="save")
      td
        button.btn.btn-primary(@click="save") Save
        button.btn.btn-light(@click="cancel") Cancel
    template(v-else)
      td
        router-link(:to="`/campaigns/${campaignId}/journals/${journal.id}/`") {{ journal.name }}
      td
        template(v-if="campaign && session.user.id == campaign.gm_id")
          button.btn.btn-light(@click="setEditing(true)") Edit
          button.btn.btn-danger(@click="confirmDelete") Delete
</template>

<script>
  import _ from 'lodash'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  
  export default {
    props: ['journal'],
    data(){
      return {
        editing: false,
        formData: {},
        campaignId: this.$route.params.campaign_id,
      }
    },
    computed: {
      ...mapGetters({
        session: 'session',   
        campaigns: 'campaigns/collection',
      }),
      campaign(){ return this.campaigns[this.campaignId] }
    },
    created(){
      if (this.journal.id == 0){this.setEditing(true)}
    },   
    methods: {
      setEditing(value){
        this.editing = value
        if (value){ this.formData = _.cloneDeep(this.journal) }
        else { this.formData = null }
      },
      ...mapMutations({
        updateJournal: 'journals/update',
        removeJournal: 'journals/remove'
      }),
      ...mapActions({
        submitJournal: 'journals/submit',
        deleteJournal: 'journals/delete'
      }),
      save(){
        if (this.formData.name){
          this.submitJournal({journal: this.formData})
          if(this.journal.id == 0) {
            this.removeJournal(0)
          } else {
            this.setEditing(false)
          }
        }
      },
      cancel(){
        if(this.journal.id == 0){
          this.removeJournal(0)
        } else {
          this.setEditing(false)
        }
      },
      confirmDelete(){
        if (confirm("Are you sure?")){
          this.deleteJournal({journal: this.journal})
        }
      }
    }
  }
</script>

