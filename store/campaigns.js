import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import { shovel } from '~/helpers/shovel'

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
    await this.$axios.get('/campaigns').then(response => {
      let campaigns = shovel(response.data)
      commit('updateField', {path: 'collection', value: campaigns })
    })
  },
  new({commit, rootState}){
    let campaign = {id: 0, name: null, gm_id: rootState.auth.user.id} 
    commit('update', {campaign})
  },
  submit({commit}, {campaign}){
    let saveCampaign = (response)=>{
      let campaign = response.data.data.attributes
      commit('update', {campaign})
    }
    if (campaign.id == 0){
      this.$axios.post('/campaigns', campaign).then(response => {
        saveCampaign(response)
      })
    } else {
      this.$axios.put('/campaigns/' + campaign.id, campaign).then( response => {
        saveCampaign(response)
      })
    }
  },
  delete({commit}, {campaign}) {
    this.$axios.delete('/campaigns/' + campaign.id).then(response => {
      commit('remove', campaign.id)
    })
  },
}