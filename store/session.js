import { getField, updateField } from 'vuex-map-fields'
import { unpackResponse } from '~/helpers/helpers'

export const state = function(){
  return ({
    session: {},
    currentUser: {},
    errorMessage: null
  })
}

export const getters = {
  getField,
  session: state => { return state.session },
  currentUser: state => { return state.currentUser }
}

export const mutations = {
  updateField,
}

export const actions = {
  async login({commit}, loginParams){
    await this.$auth.loginWith('local', {data: {session: loginParams}}).then(response => {
      let session = unpackResponse(response.data, false)
      commit('updateField', {path: 'session', value: session})
      commit('updateField', {path: 'currentUser', value: session.user})
    }).catch(response => {
      commit('updateField', {path: 'errorMessage', value: 'Could not login'})
    })
  },

  async logout({commit}){
    await this.$axios.delete('/logout').then(response => {
      commit('updateField', {path: 'session', value: null})
    })
  }
}