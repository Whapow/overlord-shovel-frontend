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
  update(state, {stack}){
    Vue.set(state.collection, stack.id, stack)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}){   
    await this.$axios.get(`/stacks`).then(response => {
      let stacks = unpackResponse(response.data)
      commit('updateField', {path: 'collection', value: stacks })
    })
  },
  new({commit}){
    let stack = {id: 0, inventory_id: null, item_id: null}
    commit('update', {stack})
  },
  submit({commit}, {stack}){
    let saveStack = (response)=>{
      let responseData = response.data.data
      let stack = {
        ...responseData.attributes, 
        item: responseData.relationships.item.data
      }
      commit('update', {stack})
    }
    if (stack.id == 0){
      this.$axios.post('/stacks', stack).then(response => {
        saveStack(response)
      })
    } else { 
      this.$axios.patch('/stacks/' + stack.id, stack).then(response => {
        saveStack(response)
      })
    }
  },
  delete({commit}, {stack}) {
    this.$axios.delete('/stacks/' + stack.id).then(response => {
      commit('remove', stack.id)
    })
  },
}