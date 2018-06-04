import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'

import mocks from "~/mocks.json"

export const state = function(){
  return ({
    campaignId: 3, //$nuxt.$route.path.split('/')[2]
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
  update(state, {item}){
    Vue.set(state.collection, item.id, item)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}){
    let response = mocks
    commit('updateField', {path: 'collection', value: {...response.data.items} })
    commit('updateField', {path: 'characters', value: response.data.characters })
    commit('updateField', {path: 'campaign', value: response.data.campaigns[3] }) // should use campaignId
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