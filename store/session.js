import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    currentUser: {},
    errorMessage: null
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
    await this.$auth.loginWith('local', {data: {session: loginParams}}).then(response => {
      let user = response.data.data.attributes
      commit('updateField', {path: 'currentUser', value: user})
      // this.$router.push('/')
    }).catch(response => {
      commit('updateField', {path: 'errorMessage', value: 'Could not login'})
    })
  },

  async logout({commit}){
    await this.$axios.delete('/logout').then(response => {
      commit('updateField', {path: 'currentUser', value: null})
    })
  }
}