import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		itemID:''
	},
	mutations:{
		setItemID(state,val){
			state.itemID = val;
		}
	}
});