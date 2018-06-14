import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    collection: {},
  })
}

export const getters = {
  getField,
  collection: state => {return state.collection}
}

export const mutations = {
  updateField,
  update(state, {character}){
    Vue.set(state.collection, character.id, character)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}, params){
    await this.$axios.get('/api/characters').then(response => {
      let characters = Object.assign({}, ...response.data.data.map(c => {return {[c.id]: c.attributes} }) )
      commit('updateField', {path: 'collection', value: characters })
    })
  },
  // new({commit, state}){
  //   let character = {id: 0, name: null, gm_id: null}
  //   commit('update', {character})
  // },
  // submit({commit, state}, {character}){
  //   if (character.id == 0){character.id = Math.random()*100}
  //   commit('update', {character})
  // },
  // delete({commit}, {character}) {
  //   remove(character.id)
  // },
}