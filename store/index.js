import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

export const state = function(){
  return ({
  })
}

export const getters = {
  getField,
  session: state => { return {
    active: state.auth.loggedIn, 
    user: state.auth.user
  }},
}

export const mutations = {
  updateField,
}

export const actions = {
  // async nuxtServerInit({dispatch}){
  //   await dispatch('campaigns/init')
  // },
}