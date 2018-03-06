import * as types from './mutations-type'

const actions = {
	add({commit,state}){
		commit(types.SET_DATA)
	}
}

export default actions;