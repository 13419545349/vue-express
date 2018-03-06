import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'
import state from './state.js'
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict:debug,
	plugins:debug?[createLogger()]:[]
})