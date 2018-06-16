import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    collection: {},
    campaignId: null
  })
}

export const getters = {
  getField,
  collection: state => { 
    if (state.campaignId){ return _.pickBy(state.collection, function(value){return value.campaign_id == state.campaignId}) } 
    else { return state.collection }
  }
}

export const mutations = {
  updateField,
  update(state, {character}){
    Vue.set(state.collection, character.id, character)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}, params){
    if (params.campaign_id){
      let campaignId = Number(params.campaign_id)
      commit('updateField', {path: 'campaignId', value: campaignId }) 
    }
    await this.$axios.get('/characters').then(response => {
      let characters = Object.assign({}, ...response.data.data.map(c => {return {[c.id]: c.attributes} }) )
      commit('updateField', {path: 'collection', value: characters })
    })
  },
}