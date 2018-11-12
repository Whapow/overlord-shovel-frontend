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
  update(state, {itemSlot}){
    Vue.set(state.collection, itemSlot.id, itemSlot)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}, params){   
    await this.$axios.get(`/item_slots`).then(response => {
      let itemSlots = unpackResponse(response.data)
      commit('updateField', {path: 'collection', value: itemSlots })
    })
  },
  new({commit}){
    let itemSlot = {id: 0, inventory_id: null, item_id: null}
    commit('update', {itemSlot})
  },
  submit({commit}, {itemSlot}){
    let saveItemSlot = (response)=>{
      let itemSlot = response.data.data.attributes
      commit('update', {itemSlot})
    }
    if (itemSlot.id == 0){
      this.$axios.post('/item_slots', itemSlot).then(response => {
        saveItemSlot(response)
      })
    } else { 
      this.$axios.patch('/item_slots/' + itemSlot.id, itemSlot).then(response => {
        saveItemSlot(response)
      })
    }
  },
  delete({commit}, {itemSlot}) {
    this.$axios.delete('/item_slots/' + itemSlot.id).then(response => {
      commit('remove', itemSlot.id)
    })
  },
}