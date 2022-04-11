import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { shovel } from '~/helpers/shovel'

export const state = function(){
  return ({
    campaignId: null,
    collection: {},
  })
}

export const getters = {
  getField,
  collection: state => { return _.pickBy(state.collection, function(value){return value.campaign_id == state.campaignId})}
}

export const mutations = {
  updateField,
  update(state, {journal}){
    Vue.set(state.collection, journal.id, journal)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}, params){
    let campaignId = Number(params.campaign_id)
    commit('updateField', {path: 'campaignId', value: campaignId })
    await this.$axios.get(`/campaigns/${campaignId}/journals`).then(response => {
      let journals = shovel(response.data)
      commit('updateField', {path: 'collection', value: journals })
    })
  },
  new({commit, state}){
    let journal = {id: 0, name: null, campaign_id: state.campaignId}
    commit('update', {journal})
  },
  submit({commit, dispatch, state}, {journal}){
    let saveJournal = (response)=>{
      let journal = shovel(response.data)
      commit('update', {journal})
    }
    if (journal.id == 0){
      this.$axios.post('/journals', journal).then(response => {
        saveJournal(response)
      })
    } else {
      this.$axios.put('/journals/' + journal.id, journal).then( response => {
        saveJournal(response)
      })
    }
  },
  delete({commit}, {journal}) {
    this.$axios.delete('/journals/' + journal.id).then(response => {
      commit('remove', journal.id)
    })
  },
}