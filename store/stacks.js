import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import { shovel } from '~/helpers/shovel'

export const state = function(){
  return ({
    collection: {},
    active: null,
    currentUser: {},
  })
}

export const getters = {
  getField,
  collection: state => { return state.collection },
  active: state => { return state.active }
}

export const mutations = {
  updateField,
  update(state, {stack}){
    Vue.set(state.collection, stack.id, stack)
  },
  remove(state, id){
    if(id == state.active.id){ Vue.delete(state, 'active') }
    Vue.delete(state.collection, id)
  },
  select(state, stack){
    Vue.set(state, 'active', stack)
  },
  clear(state){
    Vue.delete(state, 'active')
  }
}

export const actions = {
  async init({commit}){   
    await this.$axios.get(`/stacks`).then(response => {
      let stacks = shovel(response.data)
      commit('updateField', {path: 'collection', value: stacks })
    })
  },
  new({commit}, inventory ){
    let stack = {id: 0, inventory_id: inventory.id, item_id: null}
    commit('update', {stack})
    commit('select', stack)
  },
  async submit({commit, dispatch}, {stack}){
    let saveStack = (response)=>{
      let responseData = response.data.data
      let stack = {
        ...responseData.attributes, 
        item: responseData.relationships.item.data
      }
      commit('update', {stack})
      dispatch('inventories/get', stack.inventory_id, {root: true})
    }

    let submitStack = (stack) => {
      if (stack.id == 0){
        this.$axios.post('/stacks', stack).then(response => {
          saveStack(response)
        })
      } else { 
        this.$axios.patch('/stacks/' + stack.id, stack).then(response => {
          saveStack(response)
        })
      }
    }

    if (stack.item) {
      let item = stack.item
      if (item.id == 0){
        let callback = (item)=> {
          stack.item_id = item.id
          submitStack(stack)
        }
        await dispatch('items/submit', {item, callback}, {root: true})
      } else {
        stack.item_id = item.id
        submitStack(stack)
      }
    } else {
      submitStack(stack)
    }
    
  },
  delete({commit}, {stack}) {
    this.$axios.delete('/stacks/' + stack.id).then(response => {
      commit('remove', stack.id)
    })
  },
}