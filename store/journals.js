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
  // collection: state => { return _.filter(state.collection, {'campaign_id': state.campaignId})}
  collection: state => { return state.collection }
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
  async init({commit}, url){
    let campaignId = url.split('/')[2]
    // console.log("Context: ", $context)
    commit('updateField', {path: 'campaignId', value: campaignId })
    let response = mocks
    commit('updateField', {path: 'collection', value: {...response.data.journals} })
    commit('updateField', {path: 'characters', value: response.data.characters })
    commit('updateField', {path: 'campaign', value: response.data.campaigns[campaignId] })
    commit('updateField', {path: 'currentUser', value: response.data.currentUser })

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