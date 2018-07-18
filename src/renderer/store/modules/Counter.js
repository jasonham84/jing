const state = {
  main: 0,
	data: []
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
	foo(state,data){
		state.data = data
	},
	goo(state,obj){
		var arr = state.data;
		arr.map(function(item){
			  if(item.id == obj.id){
					var str = obj.key
					   item[str] = obj.value
				}
		})
		state.data = arr;
	},
	hoo(state,obj){
		state.data.push(obj)
	},
	NEXT(state){
		var arr = state.data;
		var flage = true
		arr.map(function(item){
			 if(item.upState == "4"){
				 if(flage){
					 
				 item.upState = "1"
				 flage = false
				 }
			 }
				 // console.log(item.upState)
			 
		})
		
		state.data = arr;
		console.log(state.data,"Oooo")
	}
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
