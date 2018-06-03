import Vue from 'vue'
import groupBy from 'lodash/groupBy'
import { getField, updateField } from 'vuex-map-fields'

import mocks from "~/mocks.json"

export const state = function(){
  return ({
    campaignId: 3, //$nuxt.$route.path.split('/')[2]
    collection: {},
    characters: {},
    campaigns: {}
  })
}

export const getters = {
  getField,
  collection: state => { return groupBy(groupBy(state.collection, 'campaign_id')[state.campaignId] , 'character_id')}
}

export const mutations = {
  updateField,
  update(state, {object}){
    Vue.set(state.collection, object.id, object)
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
    commit('updateField', {path: 'campaigns', value: response.data.campaigns })
  },
  new({commit, state}){
    let item = {id: 0, name: null, description: null, value: 0, campaign_id: state.campaignId, character_id: null}
    commit('update', {object: item})
  },
  submit({commit, state}, {item}){
  },
  delete({commit}, {item}) {
  },
}