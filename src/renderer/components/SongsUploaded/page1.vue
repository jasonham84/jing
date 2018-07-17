<template>
	<div id="SongsUploaded" :class="{ff:flage,gg:!flage}">
		 <div class="box" v-show="flage">
			 <i class="el-icon-document" style="font-size: 90px;color: #d5d5d5 ;"></i>
			 <i style="margin: 10px 0;">暂无导入的歌曲</i>
			 <span class="fileinput-button">
		        <el-button type="primary" style="width: 150px;" size="mini"><i style="padding: 0 20px;">导入</i></el-button>
				<input type="file" ref="file" @change="foo"/>
			 </span>
			 <i style="margin: 10px 0;">或将文件直接拖入框中</i>
		 </div> 
		 <div class="box1"  v-show="!flage">
			 <!--单个删除弹框-->
			 <div class="box1a" :style="height" id="scroll-1">
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
			 <!--批量删除弹框-->
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
			 		<el-button type="primary" @click="delectesBtn" size="mini" :loading="delectesLoading">确 定</el-button>
			 	</span>
			 </el-dialog>
			 
			 <el-table
				ref="multipleTable"
				:data="fileList"
				tooltip-effect="dark"
				style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column
				  type="selection"
				  width="55">
				</el-table-column>
				<el-table-column
				  label="编号"
				  min-width="50">
				  <template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column
				  prop="content.songName"
				  label="歌曲名称"
				  min-width="100">
				</el-table-column>
				<el-table-column
				  prop="content.songerName"
				  label="歌手名称"
				  min-width="100">
				</el-table-column>
				<el-table-column
				prop="content.yuyan"
				label="语言"
				min-width="60">
				</el-table-column>
				<el-table-column
				prop="content.humian"
				label="画面"
				min-width="70">
				</el-table-column>
				<el-table-column
				prop="content.diqu"
				label="地区"
				min-width="80">
				</el-table-column>
				<el-table-column
				prop="content.gesi"
				label="格式"
				min-width="60">
				</el-table-column>
				<el-table-column
				prop="content.banbeng"
				label="声音版本"
				min-width="80">
				</el-table-column>
				<el-table-column
				prop="content.qufeng"
				label="曲风"
				min-width="100">
				</el-table-column>
				<el-table-column
				prop="content.zhuanjiName"
				label="专辑名称"
				min-width="120">
				</el-table-column>
				<el-table-column
				prop="content.songeState"
				label="状态"
				min-width="60">
				</el-table-column>
				<el-table-column
				prop="address"
				label="操作"
				min-width="130">
				<template slot-scope="scope">
        <i class="el-icon-upload" style="font-size: 20px; cursor: pointer; margin: 0px 5px;" @click="uploadFile(scope.row.id)"></i>
			  <i class="el-icon-edit-outline" style="font-size: 20px; cursor: pointer; margin: 0px 5px;" @click="JumpPage(scope.row.id)"></i>
				<i class="el-icon-delete" style="font-size: 20px; cursor: pointer; margin: 0px 5px;" @click="deleteFile(scope.row.id)"></i>  
        </template>
				</el-table-column>
			  </el-table>
		 </div>
		 <div class="box1b">
			 <div class="block lastBlock">
			 	<span class="demonstration" style="color: #999999;">已加载200条数据</span>
			 	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="4000">
			 	</el-pagination>
			 </div>
		 </div>
		 </div>
		<!--<div style="width: 100%;height: 50px;background: yellow;"></div>-->
	</div>
</template>

<script>
	import Bus from '../bus.js'
	import Loading from '../CustomComponents/Loading';
	const fs = require("fs")
	var filename=`${__dirname}/../../assets/data.json`;
	export default{
		data(){
			return{			
				deldecteFileID:"",
				delecteVisible:false,
				delecteLoading:false,
				delectesVisible:false,
				delectesLoading:false,
				tableData: [],
				multipleSelection: [],
				fileList:[],
				height:"",
			}
		},
		computed: {
			flage() {
				    if(this.fileList.length>0){
							
						return  false
				}else{
				  	  return true
				 }
			}
		},
		methods:{
			handleSelectionChange(val) {
				this.multipleSelection = val;
						console.log(val)
						if(this.multipleSelection.length>0){
							Bus.$emit('val2', "1")
						}else{
							Bus.$emit('val2', "0")
						}
			  },
			uploadFile(id){
				var _this = this;
				fs.readFile(filename,function(error,data){
					if(error){
						console.log(error)
					}else{
						var data = JSON.parse(data);
						    data.map(function(item){
									  if(item.id == id){
											item.content.songeState = "正在上传"
										}
								})
							var str = JSON.stringify(data);
							fs.writeFile(filename,str,function(error){
								 if(error){
									 console.log(error)
								 }else{
									 _this.$notify({				          
									 				message: '添加上传成功！',
									 				type: 'success',
									 				offset: 60,
									 				duration:1000,
									 			});	
										_this.getFile()	
									 	}
								 })
							}
					
				})
			},
			
			//编辑跳转页面
			
			JumpPage() {
				this.$router.push("/editPage")
			},
			deleteFile(id){
			           this.deldecteFileID = id
			           this.delecteVisible = true
			},
			
			handleSizeChange(val) { 
			console.log(`每页 ${val} 条`);
			
			},
			handleCurrentChange(val) {
			console.log(`当前页: ${val}`);	 				
			
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			delecteBtn(){			
			var _this = this
			this.delecteLoading = true                                
			setTimeout(function(){           	
// 					arr.map(function(item,index){
// 						if(item.id == ID){
// 							arr.splice(index,1)
// 						}
// 					}) 
					
				_this.delecteLoading = false
				_this.delecteVisible = false
// 				_this.$notify({				          
// 						message: '删除成功！',
// 						type: 'success',
// 						offset: 60,
// 						duration:1000,
// 					});	
        _this.deletedFile(true)  
				},1000)
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
						//批量删除文件
			delectesBtn(){
				var _this = this				
				this.delectesLoading = true
				setTimeout(function(){
				_this.deletedFile(false)
				},1000)							
			},
			
			
			deletedFile(flage){
				
				var _this = this
				fs.readFile(filename,function(error,data){
					  if(error){
							console.log(error)
						}else{
							var data = JSON.parse(data)
								if(flage){
									var ID = _this.deldecteFileID
									data.map(function(item,index){
										 if(item.id == ID && item.songeState!="正在上传"){
											 data.splice(index,1)
											 return;
										 }
									})									
								}else{
									var arr1 = _this.multipleSelection
									console.log(arr1)
								 for(var i = 0 ; i<arr1.length; i++){
										var id = arr1[i].id
										data.map(function(item,index){
											if(item.id == id && item.songeState!="正在上传"){
												data.splice(index,1)
												
											}
										})
									}									
								}
								
								console.log(data,"pooooooooolllllllllll")
							var str = JSON.stringify(data)	
							fs.writeFile(filename,str,function(error){
								if(error){
									console.log(error)
								}else{
									_this.delectesLoading = false
									_this.delectesVisible = false
									
								_this.$notify({				          
												message: '删除成功！',
												type: 'success',
												offset: 60,
												duration:1000,
											});									
									}	
								_this.getFile();
								// _this.fileList = data
								})	
						}
				})
			},
			saveFile(arr){				
				var _this = this;
				fs.readFile(filename,function(error,data){
					if(error){						
					}else{
						var data = JSON.parse(data)
						var str = JSON.stringify(data.concat(arr))	
						console.log(data.concat(arr))
						fs.writeFile(filename,str,function(error){
							if(error){
								console.log(error)
							}else{						
							_this.delectesLoading = false
							_this.delectesVisible = false
											_this.$notify({				          
											message: '导入成功！',
											type: 'success',
											offset: 60,
											duration:1000,
										});	
							
								}
							Bus.$emit('getNumber')
						
							})
						}
					})
			},
			getFile(){	
								
				var _this = this;
				fs.readFile(filename,function(error,data){
					if(error){
						console.log(error)
					}else{						 
						console.log(JSON.parse(data),"pppp")
						var arr = JSON.parse(data)
						var arr1 = []
						arr.map(function(item){
							if(item.content.songeState != "正在上传"){
								arr1.push(item)
							} 
						})
						_this.fileList = arr1
						Bus.$emit('getNumber')
					}
				})			
			},
			dropFolder(folder,flage){
				console.log(folder,"folder")
				var path = folder[0].path		
				var _this = this;
			if(flage){
				var arr = []
				fs.readdir(path,function(err, files){
						if (err) {
								return console.error(err);
						}
						files.forEach( function (file){
								console.log( file );							 
								var pathFile = path +"/"+file 
								var arr1 = file.split(".")[0].split("-")
								fs.stat(pathFile,function(err, stats){
									  
								if(arr1.length!=10){
									var obj = {
											"currentNum":0,
											"id":arr1[0],
											"name":file,										
											"path":pathFile,
											"type":file.split(".")[1],
											"isRepeated":false,
											
											"content":{
												"songName":"----",
												"songerName":"----",
												"yuyan":"----",
												"humian":"----",
												"diqu":"----",
												"gesi":"----",
												"banbeng":"----",
												"qufeng":"----",
												"zhuanjiName":"----",
												"songeState":"不可上传"											 
											}
									}
								}else{		
								var obj = {
											"currentNum":0,
											"id":arr1[0],
											"name":file,										
											"path":pathFile,
											"type":file.split(".")[1],
											"isRepeated":false,
											"content":{
												 "songName":arr1[1],
												 "songerName":arr1[2],
												 "yuyan":arr1[3],
												 "humian":arr1[4],
												 "diqu":arr1[5],
												 "gesi":arr1[6],
												 "banbeng":arr1[7],
												 "qufeng":arr1[8],
												 "zhuanjiName":arr1[9],
												 "songeState":"可上传"											 
											}
									}										
								}
								obj.size = stats.size;
								arr.push(obj)									
								})
							});
							console.log(arr)
							_this.isRepeated(arr,false)
						
									
					});
				}else{
					fs.stat(path,function(err,stats){
						if(err) throw err;
						var arr1 = folder[0].name.split(".")[0].split("-")
						if(arr1.length!=10){
							var obj = {
									"currentNum":0,
									"id":arr1[0],
									"name":folder[0].name,										
									"path":folder[0].path,
									"type":folder[0].name.split(".")[1],
									"isRepeated":false,
									"size":folder[0].size,
									"content":{
										"songName":"----",
										"songerName":"----",
										"yuyan":"----",
										"humian":"----",
										"diqu":"----",
										"gesi":"----",
										"banbeng":"----",
										"qufeng":"----",
										"zhuanjiName":"----",
										"songeState":"不可上传"											 
									}
							}
						}else{		
						var obj = {
									"currentNum":0,
									"id":arr1[0],
									"name":folder[0].name,										
									"path":folder[0].path,
									"type":folder[0].name.split(".")[1],
									"isRepeated":false,
									"size":folder[0].size,
									"content":{
										"songName":arr1[1],
										"songerName":arr1[2],
										"yuyan":arr1[3],
										"humian":arr1[4],
										"diqu":arr1[5],
										"gesi":arr1[6],
										"banbeng":arr1[7],
										"qufeng":arr1[8],
										"zhuanjiName":arr1[9],
										"songeState":"可上传"											 
									}
							}										
						}
						console.log(obj)
						_this.isRepeated(obj,true)
					
					})
				}
			},
			isRepeated(obj,flage){
				console.log("isRepeated")
				var _this = this;
				fs.readFile(filename,function(error,data){
					 if(error){
						 console.log(error)
						 
					 }else{
				 var arr = JSON.parse(data);
				 if(flage){
					arr.map(function(item){
						if(obj.name = item.name){
								obj.isRepeated = true
								return;
							}
						})
					_this.fileList.push(obj)
					_this.saveFile([obj])
				 }else{
					var arr1 = obj;
					for(var i=0;i<arr1.length;i++){
							var name = arr1[i].name
							arr.map(function(item){
								if(name = item.name){
										arr1[i].isRepeated = true
										return;
									}
							})
						_this.fileList.push(arr1[i])
						}
						_this.saveFile(arr1)
				  }		 				 
				}
				})
			},
		 foo(e,data){
			 if(data){
				 var currentFile = data;
			 }else{
				 var currentFile = this.$refs.file.files[0]
			 }		
			 console.log(currentFile)
			 var arr1 = currentFile.name.split(".")[0].split("-")
			 if(arr1.length!=10){
			 	var obj = {
			 			"currentNum":0,
			 			"id":arr1[0],
			 			"name":currentFile.name,										
			 			"path":currentFile.path,
			 			"type":currentFile.name.split(".")[1],
			 			"isRepeated":false,
						"size":currentFile.size,
			 			"content":{
			 				"songName":"----",
			 				"songerName":"----",
			 				"yuyan":"----",
			 				"humian":"----",
			 				"diqu":"----",
			 				"gesi":"----",
			 				"banbeng":"----",
			 				"qufeng":"----",
			 				"zhuanjiName":"----",
			 				"songeState":"不可上传"											 
			 			}
			 	}
			 }else{		
			 var obj = {
			 			"currentNum":0,
			 			"id":arr1[0],
			 			"name":currentFile.name,										
			 			"path":currentFile.path,
			 			"type":currentFile.name.split(".")[1],
			 			"isRepeated":false,
						"size":currentFile.size,
			 			"content":{
			 				"songName":arr1[1],
			 				"songerName":arr1[2],
			 				"yuyan":arr1[3],
			 				"humian":arr1[4],
			 				"diqu":arr1[5],
			 				"gesi":arr1[6],
			 				"banbeng":arr1[7],
			 				"qufeng":arr1[8],
			 				"zhuanjiName":arr1[9],
			 				"songeState":"可上传"											 
			 			}
			 	}										
			 }
		  this.isRepeated(obj,true)
		}
	},
		mounted(){
			var box = document.getElementById('SongsUploaded')
			var _this = this
			this.getFile()
			this.height =  "height:" + (document.body.clientHeight - 130) + "px"					
			
							
			
			
			window.onresize = function() {
				console.log(document.body.clientHeight)
				setTimeout(function() {
					_this.height =  "height:" + (document.body.clientHeight - 130) + "px"
					
					console.log(_this.height)
				}, 2)
			}
					box.ondragover = function (ev) {
						//阻止浏览器默认打开文件的操作
						ev.preventDefault();	
						
				}
					box.ondrop = function(e){
						
					e.preventDefault();			    	
					var files = e.dataTransfer.files
					var type = files[0].type
					console.log(files,"ppollkiijjij")
					if(files){					
							if(type == ""){
							console.log(files)
								_this.dropFolder(files,true)
							}else{
								_this.dropFolder(files,false)
							}						
            }
					}
					// console.log(this.$refs.file)
// 			this.$refs.file.addListener("change",function(e){
// 				  var name = e.currentTarget.files[0].name;
// 					console.log(name)
// 			})		
			Bus.$on("delected2",function(){
					 _this.delectesVisible = true	
				})
			Bus.$on("DRfoo",function(data){	
			console.log(data,"坎坎坷坷扩扩扩扩扩扩扩扩扩扩扩扩")
				_this.foo("",data)
			})
					
		},
		beforeDestroy(){
				Bus.$off('delected2')
				Bus.$off('DRfoo')
				Bus.$emit('val2', "0")
				window.onresize=null	
						}
	}
</script>
<style>
	 .has-gutter .cell{
		text-align: center;
	}
	 .el-table__row{
		font-size:12px ;
	}
</style>

<style scoped="scoped">
	#SongsUploaded i{
		font-style: normal;
		
	}
	
	#SongsUploaded{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background: white;
		display: flex;
		justify-content: center;
		font-size: 12px;
		
	}
	
  .ff{
			align-items: center;
	}
	.gg{
	align-items: flex-start;
	}
	#SongsUploaded .lastBlock {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	background: white;
	}
	#SongsUploaded .box{
		
		display: flex;
	
		flex-direction: column;
		
	}
	#SongsUploaded .box1{
		
		width: 100%;
		height: 100%;
	  
	  
	  font-size: 12px;
		
	}
	#SongsUploaded .box1a{
		overflow: auto;
		width: 100%;
		height: 100%;
		margin-right: 5px;
	}
	#SongsUploaded .box1b{
		padding: 0 20px;
		box-sizing: border-box;
		border-top: 1px solid gainsboro;
		width: 100%;
		height: 50px;
		background: white;
		
	}
	.fileinput-button{
		position: relative;
        display: inline-block;
		 overflow: hidden;
	}
  .fileinput-button input{
            position: absolute;
            right: 0px;
            top: 0px;
			height: 28px;
			cursor: pointer;
			opacity: 0;
            -ms-filter: 'alpha(opacity=0)';
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