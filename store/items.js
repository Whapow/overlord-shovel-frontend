import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { unpackResponse } from '~/helpers/helpers'

export const state = function(){
  return ({
    campaignId: null,
    collection: {},
  })
}

export const getters = {
  getField,
  collection: state => { return state.collection },
  itemOptions: state => { 
    return _.map(state.collection, item => { return {id: item.id, name: item.name } }) 
  }
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
    await this.$axios.get(`/items`).then(response => {
      let items = unpackResponse(response.data)
      commit('updateField', {path: 'collection', value: items })
    })
  },
  new({commit, state}){
    let item = {id: 0, name: null, description: null, value: 0, campaign_id: state.campaignId, character_id: null}
    commit('update', {item})
  },
  async submit({commit, state}, {item, callback}){
    let saveItem = (response)=>{
      let item = unpackResponse(response.data)
      commit('update', {item})
    }
    if (item.id == 0){
      this.$axios.post('/items', item).then(response => {
        saveItem(response)
        if (callback){ callback(response.data.data.attributes) }
      })
    } else { 
      this.$axios.put('/items/' + item.id, item).then(response => {
        saveItem(response)
      })
    }
  },
  delete({commit}, {item}) {
    this.$axios.delete('/items/' + item.id).then(response => {
      commit('remove', item.id)
    })
  },
}