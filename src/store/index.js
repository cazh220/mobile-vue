import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//获取token
let token = JSON.parse(localStorage.getItem('token'))

export default new Vuex.Store({
  state: {
    token: token,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
