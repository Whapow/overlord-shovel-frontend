<template lang="pug">
  tr.campaign
    template(v-if="editing")
      td.column
        input(type='text', v-model.trim="formData.name")
      td
      td
      td
        button.btn.btn-primary(@click="save") Save
        button.btn.btn-light(@click="cancel") Cancel
    template(v-else)
      td {{ campaign.name }}
      td {{ playerName(campaign.gm_id) }}
      td
        router-link.btn.btn-light(:to="`/campaigns/${campaign.id}/journals`") Journals
        router-link.btn.btn-light(:to="`/campaigns/${campaign.id}/shiny_pile`") Shiny Pile
      td
        template(v-if="session.user.id == campaign.gm_id")
          button.btn.btn-light(@click="setEditing(true)") Edit
          button.btn.btn-danger(@click="confirmDelete") Delete
</template>

<script>
  import _ from 'lodash'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  
  export default {
    props: ['campaign'],
    data(){
      return {
        editing: false,
        formData: {},
      }
    },
    computed: {
      ...mapGetters({
        session: 'session/session',
        users: 'users/collection',
      }),
    },
    created(){
      if (this.campaign.id == 0){this.setEditing(true)}
    },   
    methods: {
      setEditing(value){
        this.editing = value
        if (value){ this.formData = _.cloneDeep(this.campaign) }
        else { this.formData = null }
      },
      playerName(id){
        return ({...this.users[id]}).username
      },
      ...mapMutations({
        updateCampaign: 'campaigns/update',
        removeCampaign: 'campaigns/remove'
      }),
      ...mapActions({
        submitCampaign: 'campaigns/submit',
        deleteCampaign: 'campaigns/delete'
      }),
      save(){
        if (this.formData.name){
          this.submitCampaign({campaign: this.formData})
          if(this.campaign.id == 0) {
            this.removeCampaign(0)
          } else {
            this.setEditing(false)
          }
        }
      },
      cancel(){
        if(this.campaign.id == 0){
          this.removeCampaign(0)
        } else {
          this.setEditing(false)
        }
      },
      confirmDelete(){
        if (confirm("Are you sure?")){
          this.deleteCampaign({campaign: this.campaign})
        }
      }
    }
  }
</script>

