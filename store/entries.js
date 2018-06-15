import Vue from 'vue'
import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
    collection: {},
    journalId: null
  })
}

export const getters = {
  getField,
  collection: state => { return _.filter(state.collection, {'journal_id': state.journalId})}
}

export const mutations = {
  updateField,
  update(state, {entry}){
    Vue.set(state.collection, entry.id, entry)
  },
  remove(state, id){
    Vue.delete(state.collection, id)
  }
}

export const actions = {
  async init({commit}, params){
    let journalId = Number(params.journal_id)
    commit('updateField', {path: 'journalId', value: journalId })
    await this.$axios.get(`/journals/${journalId}/entries`).then(response => {
      let entries = Object.assign({}, ...response.data.data.map(e => {return {[e.id]: e.attributes} }) )
      commit('updateField', {path: 'collection', value: entries })
    })
  },
  new({commit, state}){
    let entry = {id: 0, journal_id: state.journalId, character_id: null, reward: 0, experience: 0}
    commit('update', {entry})
  },
  submit({commit, dispatch, state}, {entry}){
    let saveEntry = (response)=>{
      let entry = response.data.data.attributes
      commit('update', {entry})
    }
    if (entry.id == 0){
      this.$axios.post('/entries', entry).then(response => {
        saveEntry(response)
      })
    } else {
      this.$axios.patch('/entries/' + entry.id).then( response => {
        saveEntry(response)
      })
    }
  },
  delete({commit}, {entry}) {
    this.$axios.delete('/entries/' + entry.id).then(response => {
      commit('remove', entry.id)
    })
  },
}