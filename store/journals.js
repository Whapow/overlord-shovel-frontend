import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    campaignId: null,
    collection: {},
  })
}

export const getters = {
  getField,
  collection: state => { return _.filter(state.collection, {'campaign_id': state.campaignId})}
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
    this.$axios.get(`/api/campaigns/${campaignId}/journals`).then(response => {
      let journals = Object.assign({}, ...response.data.data.map(j => {return {[j.id]: j.attributes} }) )
      commit('updateField', {path: 'collection', value: journals })
    })
  },
  new({commit, state}){
    let journal = {id: 0, name: null, campaign_id: state.campaignId}
    commit('update', {journal})
  },
  submit({commit, state}, {journal}){
    if (journal.id == 0){journal.id = Math.random()*100}
    commit('update', {journal})
  },
  delete({commit}, {journal}) {
    remove(journal.id)
  },
}