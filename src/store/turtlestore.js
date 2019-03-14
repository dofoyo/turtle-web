import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		itemID:'',
		itemIDs:[],
		index:0
	},
	mutations:{
		setItemID(state,val){
			state.itemID = val;
			for (let i=0; i<state.itemIDs.length; i++) {
				  if(val == state.itemIDs[i]){
				  	state.index = i;
				  	break;
				  }
			}
			//console.log(state.index);
		},
		setItemIDs(state,val){
			state.itemIDs = val;
		},
		setIndex(state,val){
			state.index = state.index + val;
			if(state.index < 0){
				state.index = 0;
			}
			if(state.index >= state.itemIDs.length){
				state.index = state.itemIDs.length-1;
			}
			state.itemID = state.itemIDs[state.index];
		}

	}
});