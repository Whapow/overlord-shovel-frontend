import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    collection: {},
  })
}

export const getters = {
  getField,
  collection: state => {return state.collection}
}

export const mutations = {
  updateField,
  update(state, {campaign}){
    Vue.set(state.collection, campaign.id, campaign)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}, params){
    await this.$axios.get('/api/campaigns').then(response => {
      let campaigns = Object.assign({}, ...response.data.data.map(c => {return {[c.id]: c.attributes} }) )
      commit('updateField', {path: 'collection', value: campaigns })
    })
  },
  // new({commit, state}){
  //   let campaign = {id: 0, name: null, gm_id: null}
  //   commit('update', {campaign})
  // },
  // submit({commit, state}, {campaign}){
  //   if (campaign.id == 0){campaign.id = Math.random()*100}
  //   commit('update', {campaign})
  // },
  // delete({commit}, {campaign}) {
  //   remove(campaign.id)
  // },
}