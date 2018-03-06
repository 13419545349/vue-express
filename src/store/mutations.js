import * as types from './mutations-type'

const mutations = {
	[types.SET_DATA](state){
		state.count+=1
	},
	[types.UPDATE_USER_INFO](state,nickName){
		state.nickName = nickName
	},
	[types.UPDATE_CART_COUNT](state,cartCount){
		state.cartCount += cartCount
	},
	[types.INIT_CART_COUNT](state,cartCount){
		state.cartCount = cartCount
	}
}

export default mutations