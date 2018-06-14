import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    campaignId: null,
    collection: {},
    characters: {},
    campaign: {},
    currentUser: {},
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
    commit('updateField', {path: 'collection', value: {...response.data.journals} })
    commit('updateField', {path: 'campaign', value: response.data.campaigns[campaignId] })

  },
  new({commit, state}){
    let journal = {id: 0, name: null}
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