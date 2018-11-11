import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { unpackResponse } from '~/helpers/helpers'

export const state = function(){
  return ({
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
  update(state, {item_slot}){
    Vue.set(state.collection, item_slot.id, item_slot)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}, params){   
    await this.$axios.get(`/item_slots`).then(response => {
      let item_slots = unpackResponse(response.data)
      commit('updateField', {path: 'collection', value: item_slots })
    })
  },
  new({commit}){
    let item_slot = {id: 0, inventory_id: null, item_id: null}
    commit('update', {item_slot})
  },
  submit({commit}, {item_slot}){
    let saveItem = (response)=>{
      let item_slot = response.data.data.attributes
      commit('update', {item_slot})
    }
    if (item_slot.id == 0){
      this.$axios.post('/item_slots', item_slot).then(response => {
        saveItem(response)
      })
    } else { 
      this.$axios.patch('/item_slots/' + item_slot.id, item_slot).then(response => {
        saveItem(response)
      })
    }
  },
  delete({commit}, {item_slot}) {
    this.$axios.delete('/item_slots/' + item_slot.id).then(response => {
      commit('remove', item_slot.id)
    })
  },
}