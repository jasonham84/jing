<template>
	<div id="Uploading" :class="{ff:boxFlage,gg:!boxFlage}">
		<div class="box1" v-show="boxFlage">
			<i class="el-icon-document" style="font-size: 90px;color: #d5d5d5 ;"></i>
			<div style="margin: 10px 0;font-size: 16px;">暂无上传的歌曲</div>						
		</div>
		<div class="box2" v-show="!boxFlage">
			
			<div class="box2a" :style="height" id="scroll-1">
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column
				  type="selection"
				 min-width="55">
				</el-table-column>
				<el-table-column
				  label="编号"
				  min-width="40">
				  <template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column
				  prop="content.songerName"
				  label="歌曲名称"
				  min-width="80">
				</el-table-column>
				<el-table-column
				  prop="content.songName"
				  label="歌手名称"
				  min-width="60"
				  >
				</el-table-column>
				<el-table-column
				label="大小"
				min-width="40"
				>
				<template slot-scope="scope">{{ scope.row.size | FileSize }}</template>
				</el-table-column>
				<el-table-column
				prop="upState"
				label="状态"
				min-width="120"
				>
				<template slot-scope="scope">
					<div v-if="scope.row.upState=='0'">	
						<i>可上传</i>
					</div>
					<div v-if="scope.row.upState=='1'">
						<!--<el-progress :percentage="50"></el-progress>-->
						<Upload :file="scope.row" :ref="scope.row.id"></Upload>						
					</div>
					<div v-if="scope.row.upState=='2'">
						<!--<Upload :file="scope.row" :ref="scope.row.id"></Upload>-->
						<el-progress :percentage="Math.floor((scope.row.currentNum/scope.row.size)*100)"></el-progress>
					</div>
					<div v-if="scope.row.upState=='3'">						
						<i style="color: red;">未找到指定文件，请确认路径</i>
					</div>
					<div v-if="scope.row.upState=='4'">						
						<i>正在等待网络连接</i>
					</div>
					<div v-if="scope.row.upState=='5'">						
						<i style="color: red;">服务器错误</i>
					</div>
					<div v-if="scope.row.upState=='6'">						
						<i>替换中...</i>
					</div>
					<div v-if="scope.row.upState=='7'">						
						<i style="color: red;">歌曲信息重复</i><a>请选择操作</a>
					</div>
					<div v-if="scope.row.upState=='8'">						
						<i>上传完成</i>
					</div>
				</template>
				</el-table-column>
				<el-table-column
				label="操作"
				min-width="80"
				>
				<template slot-scope="scope">
					<div style="display: flex;justify-content: center;">	
						<div style="width: 24px;height: 24px;display: flex;justify-content: center;align-items: center;margin: 0px 10px;">
							 <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='0'" @click="uploadBtn(scope.row.id)"></i>
						   <i class="el-icon-download" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='1'" @click="uploadBtn(scope.row.id)"></i>
						   <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='2'" @click="uploadBtn(scope.row.id)"></i>
						   <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='3'"></i>
						   <i class="el-icon-sort" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='4'"></i>
						   <i class="el-icon-refresh" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='5'"></i>
               <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='6'"></i>
						</div>
						<div style="width: 24px;height: 24px;display: flex;justify-content: center;align-items: center;margin: 0px 10px;">					
						   <i class="el-icon-delete" style="font-size: 20px; cursor: pointer; margin: 0px 10px;" @click="uploadDelect(scope.row.id)"></i> 
						</div>
					</div>
				</template>
				</el-table-column>
			</el-table>
			</div>
			<div class="box2b" >
				<span class="demonstration" style="color: #999999;">已加载{{totleNumber}}条数据</span>
			</div>
		</div>	
		<el-dialog
		title="提示"
		:visible.sync="delecteVisible"
		custom-class="DELECT"
		width="30%"
		top='30vh'
		>
		<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>此操作将永久删除该文件, 是否继续?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="delecteVisible = false" size="mini">取 消</el-button>
			<el-button type="primary" @click="delecteBtn" size="mini" :loading="delecteLoading">确 定</el-button>
		</span>
		</el-dialog>
		
		<el-dialog
		title="提示"
		:visible.sync="delectesVisible"
		custom-class="DELECT"
		width="30%"
		top='30vh'
		>
		<span><i class="el-icon-warning" style="color: #e6a23c;margin-right: 10px;font-size: 16px;"></i>此操作将永久删除选中文件, 是否继续?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="delectesVisible = false" size="mini">取 消</el-button>
			<el-button type="primary" @click="delectAllBtn" size="mini" :loading="delectesLoading">确 定</el-button>
		</span>
		</el-dialog>
	</div>
</template>

<script>
	import Bus from '../bus.js'
	import Loading from '../CustomComponents/Loading';
	import Upload from '../CustomComponents/upload';
	const fs = require("fs")
	var filename=`${__dirname}/../../assets/data.json`;
	
	export default{
		components: { Upload },
		data(){
			return{
				
				multipleSelection:[],
				height:'',
				currentID:"",
				delecteVisible:false,
				delecteLoading:false,
				delectesVisible:false,
				delectesLoading:false,
				flageAll:true
				
				
			}
		},
		filters: {
			FileSize: function(value) {
				
				return Math.floor(value/1024/1024) >1024? Math.floor(value/1024/1024)/1024+"G" : Math.floor(value/1024/1024)+"M";
			}
		},
		computed: {
			boxFlage() {
				if(this.tableData.length>0){
					return false
				}else{
					return true
				}				
			},
			totleNumber(){
				return this.tableData.length;
			},
			tableData(){
				
				return this.$store.state.Counter.data
				
			},
			tableData1(){
				  var arr = []
					this.$store.state.Counter.data.map(function(item){
						   if(item.upState !== "9"){
								 arr.push(item)
							 }
					})
					return arr;
			}
		},
// 		watch: {
// 			tableData(newValue, oldValue) {
// 				  console.log(newValue,oldValue)
// 				
// 			}
// 		},
		methods:{
			getData(){
					var _this = this;
					var arr = this.$store.state.Counter.data;
	// 				
				arr.map(function(item){
							fs.stat(item.path,function(error,data){
								if(error){
									console.log(error)
									// item.upState = "3"
									var obj = {									
										"id":item.id,
										"key":"upState",
										"value":"3"
									}
									_this.$store.commit("goo",obj)
									
								}else{										
									// item.daxiao = Math.floor(data.size/1024/1024) >1024? Math.floor(data.size/1024/1024)/1024+"G" : Math.floor(data.size/1024/1024)+"M";
									
									if(!item.upState){
										var obj = {										
											"id":item.id,
											"key":"upState",
											"value":"0"
										}
										_this.$store.commit("goo",obj)
									}																		
								}						
							})
							
				
				})
		  console.log(arr,"oolkkjhh")
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				if(this.multipleSelection.length>0){
					this.flageAll = false
					Bus.$emit('val3', "1")
				}else{
					this.flageAll = true
					Bus.$emit('val3', "0")
				}
			},
			uploadBtn(id){
				console.log(id)
				var arr = this.tableData;
				var _this = this;
				    arr.map(function(item){
							 if(item.id == id){
								 console.log(_this.$store.getters.number)
								 if(item.upState == "0"){
									 
								    // item.upState = '1'
										if(_this.$store.getters.number<3){
											
												var obj = {
													
													 "id":id,
													 "key":"upState",
													 "value":"1"
												}
												_this.$store.commit("goo",obj)
												
										}else{
											var obj = {												
												"id":id,
												"key":"upState",
												"value":"4"
											}
											_this.$store.commit("goo",obj)
										}
										
								 }else if(item.upState == "1"){
									 
									  // item.upState = '2'
										var obj = {
											
											"id":id,
											"key":"upState",
											"value":"2"
										}
										_this.$refs[id].stop()
										_this.$store.commit("goo",obj)
										
								 }else if(item.upState == "2"){
									     
									 if(_this.$store.getters.number<3){
												 var obj = {									 	
													"id":id,
													"key":"upState",
													"value":"1"
												 }
												 _this.$store.commit("goo",obj)
												 // _this.$refs[id].start()									 
										 }else{
									    var obj = {												
									    	"id":id,
									    	"key":"upState",
									    	"value":"4"
									    }
									    _this.$store.commit("goo",obj)
									 }
								 }
							 }
						})

			},
			uploadDelect(id){
				this.currentID = id;
				this.delecteVisible = true
				var _this = this;
				this.tableData.map(function(item){
					  if(item.upState == "1"){
							 _this.$refs[item.id].stop();
						}
				})
			},
			StopUpload(){
				var _this = this;
				var arr = [];
				if(this.flageAll){
					arr = [...this.tableData]
					
				}else{
					arr = this.multipleSelection
				}
				arr.map(function(item){
					   if(item.upState == "1"){
							    var obj = {
										 "id":item.id,
										 "key":"upState",
										 "value":"2"
										 
									}
								_this.$refs[item.id].stop()
								_this.$store.commit("goo",obj)
						 }else if(item.upState == "4"){
							   var obj = {
									  "id":item.id,
										"key":"upState",
										"value":"0"
								 }
								_this.$store.commit("goo",obj)
						 }
				})
				// this.$store.commit("NEXT")
			},
			StartUpload(){
				var _this = this;
				var arrAll = [];
				if(this.flageAll){
					arrAll = [...this.tableData]
				}else{
					arrAll = this.multipleSelection
				}
				arrAll.map(function(item){
					  if(item.upState == "0"&& _this.$store.getters.number<3){
							    var obj = {
										"id":item.id,
										"key":"upState",
										"value":"1"
									}
								_this.$store.commit("goo",obj)
								// _this.$refs[item.id].start()
								
						}else if(item.upState == "0"&& _this.$store.getters.number>=3){
								var obj = {
									"id":item.id,
									"key":"upState",
									"value":"4"
								}
							_this.$store.commit("goo",obj)
						}else if(item.upState == "2"&& _this.$store.getters.number<3){
								var obj = {
									"id":item.id,
									"key":"upState",
									"value":"1"
								}
							_this.$store.commit("goo",obj)
							 // _this.$refs[item.id].start()
						}else if(item.upState == "2"&& _this.$store.getters.number>=3){
								var obj = {
									"id":item.id,
									"key":"upState",
									"value":"4"
								}
							_this.$store.commit("goo",obj)
						}
				})
				
					// this.$store.commit("NEXT")
				
			},
			DelectUpload(){
				if(this.tableData.length>0){				
				   this.delectesVisible = true;
					 var _this = this;
					 console.log("oolkkjmbb")
					 this.tableData.map(function(item){
					 		if(item.upState == "1"){
					 			_this.$refs[item.id].stop();
					 		}
					 })
				}
			},
			delectAllBtn(){
				var _this = this;
				this.delectesLoading = true;
				var arrAll = [];
				if(this.flageAll){
					arrAll = [...this.tableData]
				}else{
					arrAll = this.multipleSelection
				}
				console.log(arrAll)
				
				setTimeout(function(){
					_this.$store.commit("delectAll",arrAll)
					setTimeout(function(){
						_this.$store.state.Counter.data.map(function(item){
							     if(item.upState == "1"){
										 _this.$refs[item.id].start()
									 }
						    })
						  _this.$store.commit("NEXT")
							_this.delectesLoading = false;
							_this.delectesVisible = false;
					},100)
// 						fs.readFile(filename,function(error,data){
// 							 if(error){
// 								 console.log(error)
// 							 }else{
// 								 var arr = JSON.parse(data);
// 								 arrAll.map(function(item,index){
// 									 var flage = false;
// 									 
// 										if(item.upState == "1"){
// 											var obj = {
// 												"id":item.id,
// 												"key":"upState",
// 												"value":"2"
// 											}
// 											_this.$store.commit("goo",obj)
// 											_this.$refs[item.id].stop()
// 										 }
// 									  _this.$store.commit("delect",item.id)
// 									  arr.map(function(item1,index1){											
// 											
// 									  	if(item.id == item1.id){
// 
//                           arr.splice(index1,1)
// 												 }
// 
// 										})
// 
// 								 })
// 								console.log(arr)
// 								 var str = JSON.stringify(arr)
// 								 fs.writeFile(filename,str,function(error){
// 									 if(error){
// 										 console.log(error)
// 									 }else{
// 										 _this.delectesLoading = false;
// 										 _this.delectesVisible = false;
// 										 console.log(_this.delectesVisible)
// 										 Bus.$emit("getNumber")
// 										  _this.$store.commit("NEXT")
// 									 }
// 								 })															
// 							 }
// 						})			    
				},1000)				
			},
			delecteBtn(){
			var _this = this;
			this.delecteLoading = true;
			var id = this.currentID;
			
			setTimeout(function(){
				
		    _this.$store.state.Counter.data.map(function(item){
					if(item.id == id && item.upState == "1"){
						var obj = {
							"id":item.id,
							"key":"upState",
							"value":"2"
						}
						_this.$store.commit("goo",obj)
					
						
						
					}
				})
				// _this.$refs[id].stop()
				console.log("delect")
				_this.$store.commit("delect",id)
				
				console.log(_this.tableData,"this.tableData")
				setTimeout(function(){
						_this.tableData.map(function(item){
						 if(item.upState == "1"){
							 _this.$refs[item.id].start()
						 }
					})	
					_this.$store.commit("NEXT")

				_this.delecteVisible = false;
				_this.delecteLoading = false;
				},100)
// 				fs.readFile(filename,function(error,data){
// 						if(error){
// 							console.log(error)
// 						}else{
// 							var arr = JSON.parse(data);
// 							arr.map(function(item,index){
// 									if(item.id == id){
// 										arr.splice(index,1)
// 										// console.log(item)
// 									}
// 							})
// 							// console.log(arr)
// 							var str = JSON.stringify(arr)
// 							fs.writeFile(filename,str,function(error){
// 								if(error){
// 									console.log(error)
// 								}else{
// 									Bus.$emit("getNumber") 
// 									_this.$store.commit("NEXT")
// 									_this.delecteVisible = false;
// 									_this.delecteLoading = false;
// 								}
// 							})
// 						}
// 				})
				},1000)
			}
		 
		},
		
		mounted(){
			var _this = this;
			// this.getData()
			this.height =  "height:" + (document.body.clientHeight - 130) + "px"					
			window.onresize = function() {
				// console.log(document.body.clientHeight)
				setTimeout(function() {
					_this.height =  "height:" + (document.body.clientHeight - 130) + "px"
					
					// console.log(_this.height)
				}, 2)
			}
			Bus.$on('StopUpload',function(){
				_this.StopUpload()
			})
			Bus.$on("StartUpload",function(){
				_this.StartUpload()
			})
			Bus.$on("DelectUpload",function(){
				_this.DelectUpload()
			})
			
			console.log(this.$store.state.Counter.data,"Counter")
		},
		beforeDestroy(){
// 				Bus.$off('delected2')
// 				Bus.$off('DRfoo')
				Bus.$emit('val3', "0")
				// window.onresize=null	
	  }
	}
</script>

<style>
	i {
		font-style: normal;
	}
	.el-progress__text{
		display: none;
	}
	#Uploading{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;	
		position: relative;
	}
	#Uploading .box2{
		width: 100%;
		
	}
	.el-table td{
		height: 54px;
	}
	#Uploading .box2a{
		overflow: auto;
		
		height: 100%;
		
		margin-right: 5px;
	}
	#Uploading .box2b{
		padding: 0 20px;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		border-top: 1px solid gainsboro;
		width: 100%;
		height: 50px;
		background: white;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
   .ff{
	    align-items: center;
	}
	.gg{
	   align-items: flex-start;
	}
	#scroll-1::-webkit-scrollbar-track,.el-checkbox-group::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #f0f0f0;
		}
	
		#scroll-1::-webkit-scrollbar,.el-checkbox-group::-webkit-scrollbar {
		width: 10px;
		background-color: #f0f0f0;
		}
	
		#scroll-1::-webkit-scrollbar-thumb,.el-checkbox-group::-webkit-scrollbar-thumb {
		border-radius: 20px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: #cfd1d3;
		}
	
		#scroll-1::-webkit-scrollbar-thumb:hover,.el-checkbox-group::-webkit-scrollbar-thumb:hover {
		background-color: #a7acb1;
		}
	
		#scroll-1::-webkit-scrollbar-thumb:active,.el-checkbox-group::-webkit-scrollbar-thumb:active {
		background-color: #9da2a7;
		}	
</style>