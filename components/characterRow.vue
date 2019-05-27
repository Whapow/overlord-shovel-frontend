<template lang="pug">
  tr.character
    template(v-if="editing")
      td.column
        input(type='text', v-model.trim="formData.name", @keyup.enter="save")
      td.column
        select(v-model="formData.campaign_id")
          option(:value="null") None
          option(v-for="campaign in campaigns", :value="campaign.id") {{ campaign.name }}
      td
        button.btn.btn-primary(@click="save") Save
        button.btn.btn-light(@click="cancel") Cancel
    template(v-else)
      td {{ character.name }}
      td {{ campaign.name }}
      td
        template(v-if="session.user.id == user.id")
          button.btn.btn-light(@click="setEditing(true)") Edit
          button.btn.btn-danger(@click="confirmDelete") Delete
</template>

<script>
  import _ from 'lodash'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  
  export default {
    props: ['character'],
    data(){
      return {
        editing: false,
        formData: {},
        userId: this.$route.params.user_id,
      }
    },
    computed: {
      ...mapGetters({
        session: 'session',
        campaigns: 'campaigns/collection',
        users: 'users/collection'
      }),
      user(){ return this.users[this.userId] || {} },
      campaign(){ return this.campaigns[this.character.campaign_id] || {} }
    },
    created(){
      if (this.character.id == 0){this.setEditing(true)}
    },   
    methods: {
      setEditing(value){
        this.editing = value
        if (value){ this.formData = _.cloneDeep(this.character) }
        else { this.formData = null }
      },
      ...mapMutations({
        updateCharacter: 'characters/update',
        removeCharacter: 'characters/remove'
      }),
      ...mapActions({
        submitCharacter: 'characters/submit',
        deleteCharacter: 'characters/delete'
      }),
      save(){
        if (this.formData.name){
          this.submitCharacter({character: this.formData})
          if(this.character.id == 0) {
            this.removeCharacter(0)
          } else {
            this.setEditing(false)
          }
        }
      },
      cancel(){
        if(this.character.id == 0){
          this.removeCharacter(0)
        } else {
          this.setEditing(false)
        }
      },
      confirmDelete(){
        if (confirm("Are you sure?")){
          this.deleteCharacter({character: this.character})
        }
      }
    }
  }
</script>

