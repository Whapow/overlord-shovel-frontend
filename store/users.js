import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    collection: {}
  })
}

export const getters = {
  getField,
  collection: state => {return state.collection}
}

export const mutations = {
  updateField,
}

export const actions = {
  async init({commit}){
    await this.$axios.get('/users').then(response => {
      let users = Object.assign({}, ...response.data.data.map(u => {return {[u.id]: u.attributes} }) )
      commit('updateField', {path: 'collection', value: users })
    })
  },
}