import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import { unpackResponse } from '~/helpers/helpers'

export const state = function(){
  return ({
    collection: {},
    errors: {}
  })
}

export const getters = {
  getField,
  collection: state => {return state.collection},
  errors: state => {return state.errors}
}

export const mutations = {
  updateField,
  update(state, {user}){
    Vue.set(state.collection, user.id, user)
  },
}

export const actions = {
  async init({commit}){
    await this.$axios.get('/users').then(response => {
      let users = unpackResponse(response.data)
      commit('updateField', {path: 'collection', value: users })
    })
  },
  get({commit}, userId){
    this.$axios.get(`/users/${userId}`).then(response => {
      let user = unpackResponse(response.data)
      commit('update', {user})
    })
  },
  submit({commit}, {user, callback}){
    let saveUser = (response)=>{
      let user = unpackResponse(response.data)
      commit('update', {user})
    }
    let request = (user.id == 0 ? this.$axios.post('/users', {user}) : this.$axios.patch(`/users/${user.id}`, {user}) )
    request.then(response => {
      saveUser(response)
      commit('updateField', {path: 'errors', value: {} })
      callback()
    }).catch( error => {
      commit('updateField', {path: 'errors', value: error.response.data })
    })
  }
}