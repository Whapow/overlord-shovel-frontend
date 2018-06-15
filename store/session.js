import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    currentUser: 1,
  })
}

export const getters = {
  getField,
  currentUser: state => { return state.currentUser }
}

export const mutations = {
  updateField,
}

export const actions = {
  async login({commit}, loginParams){
    await this.$axios.post('/login', {session: loginParams}).then(response => {
      let user = response.data.data.attributes
      commit('updateField', {path: 'currentUser', value: user})
    })
  },

  async logout({commit}){
    await this.$axios.delete('/logout').then(response => {
      commit('updateField', {path: 'currentUser', value: null})
    })
  }
}