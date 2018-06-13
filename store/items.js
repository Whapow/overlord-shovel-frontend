import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'

import mocks from "~/mocks.json"

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
  collection: state => { return _.filter(state.collection, {'campaign_id': Number(state.campaignId)})}
}

export const mutations = {
  updateField,
  update(state, {item}){
    Vue.set(state.collection, item.id, item)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}, params){
    let campaignId = params.campaign_id
    commit('updateField', {path: 'campaignId', value: campaignId })    
    let response = mocks
    this.$axios.get(`/api/campaigns/${campaignId}/items`).then(response => {
      let items = Object.assign({}, ...response.data.data.map(i => {return {[i.id]: i.attributes} }) )
      commit('updateField', {path: 'collection', value: items })
    })
    commit('updateField', {path: 'characters', value: response.data.characters })
    commit('updateField', {path: 'campaign', value: response.data.campaigns[campaignId] }) // should use campaignId
    commit('updateField', {path: 'currentUser', value: response.data.currentUser })
  },
  new({commit, state}){
    let item = {id: 0, name: null, description: null, value: 0, campaign_id: state.campaignId, character_id: null}
    commit('update', {item})
  },
  submit({commit, state}, {item}){
    if (item.id == 0){item.id = Math.random()*100}
    commit('update', {item})
  },
  delete({commit}, {item}) {
    remove(item.id)
  },
}