<template lang="pug">
  tr.entry
    template(v-if="editing")
      td.column
        select(v-model.trim="formData.character_id")
          option(:value="null") Please Select
          option(v-for="character in characters[campaignId]", :value="character.id") {{ character.name }}
      td.column
        input(type='text', v-model.number="formData.reward")
      td.column
        input(type='text', v-model.number="formData.experience")
      td
        button.btn.btn-primary(@click="save") Save
        button.btn.btn-light(@click="cancel") Cancel
    template(v-else)
      td.column
        p {{ character.name }}
      td.column
        i {{ entry.reward }}
      td.column
        p {{ entry.experience }}
      td
        template(v-if="session.user.id == campaign.gm_id")
          button.btn.btn-light(@click="setEditing(true)") Edit
          button.btn.btn-danger(@click="confirmDelete") Delete
</template>

<script>
  import _ from 'lodash'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    props: ['entry'],
    data(){
      return {
        editing: false,
        formData: {},
        campaignId: this.$route.params.campaign_id,
        journalId: this.$route.params.journal_id
      }
    },
    computed: {
      ...mapGetters({
        session: 'session/session',
        campaigns: 'campaigns/collection',
        characters: 'characters/byCampaign',
      }),
      campaign(){ return this.campaigns[this.campaignId] },
      character(){ return this.characters[this.entry.character_id] || {} },
    },
    created(){
      if (this.entry.id == 0){this.setEditing(true)}
    },   
    methods: {
      setEditing(value){
        this.editing = value
        if (value){ this.formData = _.cloneDeep(this.entry) }
        else { this.formData = null }
      },
      ...mapMutations({
        updateEntry: 'entries/update',
        removeEntry: 'entries/remove'
      }),
      ...mapActions({
        submitEntry: 'entries/submit',
        deleteEntry: 'entries/delete'
      }),
      save(){
        if (this.formData.character_id && this.formData.reward && this.formData.experience ){
          if(this.entry.id == 0) {
            this.submitEntry({entry: this.formData})
            this.removeEntry(0)
          } else {
            this.updateEntry({entry: this.formData})
            this.setEditing(false)
          }
        }
      },
      cancel(){
        if(this.entry.id == 0){
          this.removeEntry(0)
        } else {
          this.setEditing(false)
        }
      },
      confirmDelete(){
        if (confirm("Are you sure?")){
          this.deleteEntry({entry: this.entry})
        }
      }
    }
  }
</script>

