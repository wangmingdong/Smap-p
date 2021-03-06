import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import custom from './modules/custom'
import system from './modules/system'
import meta from './modules/meta'
import data from './modules/data'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    user,
    custom,
    meta,
    data,
    system
  },
  getters
})

export default store
