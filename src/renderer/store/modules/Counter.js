const state = {
  main: 0,
	data: [],
	data1:[],
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
		// console.log(state.data)
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
		 console.log('getters.number')
	},

	delect(state,id){
		var arr = state.data;
		console.log(arr,id,"Counter delect")
		    arr.map(function(item,index){
					  if(item.id == id){
							arr.splice(index,1)
						}
				})
				state.data = arr;
				// console.log(state.data)
	},
	delectAll(state,arrAll){
		var arr = state.data;
		var arr1 = [];
    arr.map(function(item){
			  var flage = true;
			  arrAll.map(function(item1){
					 if(item.id == item1.id){
						    flage = false;
					 }
				})
				if(flage){
					arr1.push(item)
				}
		})
		state.data = arr1;
		console.log(arrAll)
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
