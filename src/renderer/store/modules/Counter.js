const state = {
  main: 0,
	data: [],
	UPnumber: 0,
	DRnumber:0
}
const getters = {
	number: state => {
		   var arr = state.data;
			 var i = 0;
			     arr.map(function(item){
						  if(item.upState == "1"){
								  i++;
							}
					 })
      return i;
    }
}
const mutations = {
//   DECREMENT_MAIN_COUNTER (state) {
//     state.main--
//   },
//   INCREMENT_MAIN_COUNTER (state) {
//     state.main++
//   },
 UPnumber1(state,num){
	 state.UPnumber = num;
 },
 DRnumber1(state,num){
	 state.DRnumber = num;
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
				
			 
		})
		
		state.data = arr;
		 // console.log(getters.number)
	},
	delect(state,id){
		var arr = state.data;
		    arr.map(function(item,index){
					  if(item.id == id){
							arr.splice(index,1)
						}
				})
				state.data = arr
	}
}

const actions = {
  someAsyncTask ({ commit }) {
    
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
	getters,
  mutations,
  actions
}
