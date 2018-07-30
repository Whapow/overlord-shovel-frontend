import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    campaignId: null,
    collection: {},
    currentUser: {},
  })
}

export const getters = {
  getField,
  collection: state => { return state.collection }
}

export const mutations = {
  updateField,
  update(state, {inventory}){
    Vue.set(state.collection, inventory.id, inventory)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}, params){
    let campaignId = Number(params.campaign_id)
    commit('updateField', {path: 'campaignId', value: campaignId })    
    await this.$axios.get(`/campaigns/${campaignId}/inventories`).then(response => {
      let inventories = Object.assign({},
        ...response.data.data.map(i => {
          return { [i.id]: {...i.attributes, ..._.mapValues(i.relationships, r => { return r.data }) } } 
        }) 
      )
      commit('updateField', {path: 'collection', value: inventories })
    })
  },
  new({commit}){
    let inventory = {id: 0, name: null, owner_id: null, owner_type: null}
    commit('update', {inventory})
  },
  submit({commit}, {inventory}){
    let saveItem = (response)=>{
      let inventory = response.data.data.attributes
      commit('update', {inventory})
    }
    if (inventory.id == 0){
      this.$axios.post('/inventories', inventory).then(response => {
        saveItem(response)
      })
    } else { 
      this.$axios.patch('/inventories/' + inventory.id, inventory).then(response => {
        saveItem(response)
      })
    }
  },
  delete({commit}, {inventory}) {
    this.$axios.delete('/inventories/' + inventory.id).then(response => {
      commit('remove', inventory.id)
    })
  },
}