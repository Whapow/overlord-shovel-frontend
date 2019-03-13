import { getField, updateField } from 'vuex-map-fields'
import { unpackResponse } from '~/helpers/helpers'

export const state = function(){
  return ({
    session: {},
    errorMessage: null
  })
}

export const getters = {
  getField,
}

export const mutations = {
  updateField,
}

export const actions = {
  async login({commit}, loginParams){
    await this.$auth.loginWith('local', {data: {session: loginParams}})
    .then(() => {
      this.$router.push('/')
    }).catch(e => {
      commit('updateField', {path: 'errorMessage', value: 'Could not login'})
    })
  },
  
  get({commit}){
    this.$axios.get('/session').then(response => {
      let session = unpackResponse(response.data)
      commit('updateField', {path: 'session', value: session})      
    })
  },
  
  async logout({commit}){
    await this.$auth.logout().then(response => {
      commit('updateField', {path: 'session', value: {}})
      this.$router.push('/login')
    })
  }
}