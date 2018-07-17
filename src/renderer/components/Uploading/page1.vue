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
				prop="daxiao"
				label="大小"
				min-width="40"
				>
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
						<Upload :file="scope.row" :ref="scope.row.id"></Upload>
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
				</template>
				</el-table-column>
				<el-table-column
				label="操作"
				min-width="80"
				>
				<template slot-scope="scope">
					<div style="display: flex;justify-content: center;">	
						<div style="width: 24px;height: 24px;display: flex;justify-content: center;align-items: center;margin: 0px 10px;">
							 <i class="el-icon-caret-right" style="font-size: 24px; cursor: pointer;" v-if="scope.row.upState=='0'" @click="uploadBtn(scope.row.id)"></i>
						   <i class="iconfont icon-xiazaizanting" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='1'" @click="stopBtn(scope.row.id)"></i>
						   <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='2'"></i>
						   <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='3'"></i>
						   <i class="el-icon-sort" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='4'"></i>
						   <i class="el-icon-refresh" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='5'"></i>
               <i class="el-icon-caret-right" style="font-size: 20px; cursor: pointer;" v-if="scope.row.upState=='6'"></i>
						</div>
						<div style="width: 24px;height: 24px;display: flex;justify-content: center;align-items: center;margin: 0px 10px;">					
						   <i class="el-icon-delete" style="font-size: 20px; cursor: pointer; margin: 0px 10px;"></i> 
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
				
				tableData:[],
				multipleSelection:[],
				height:'',
				
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
			}
		},
		methods:{
			getData(){
				var _this = this;
				fs.readFile(filename,function(error,data){
					console.log(data.length)
					if(error){
						console.log(error)
					}else{
						var data = JSON.parse(data);
						
						data.map(function(item){
							
							if(item.content.songeState == "正在上传"){
								fs.stat(item.path,function(error,data){
									if(error){
										console.log(error)
										item.upState = "3",
										item.isStop = '0'
									}else{										
										item.daxiao = Math.floor(data.size/1024/1024) >1024? Math.floor(data.size/1024/1024)/1024+"G" : Math.floor(data.size/1024/1024)+"M";
										item.upState = "0"	
									}
									_this.tableData.push(item)
									// console.log(data)
// 									console.log(_this.tableData)
								})								
							}
						})
						
					}
				})			
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			uploadBtn(id){
				var arr = this.tableData;
				    arr.map(function(item){
							 if(item.id == id){
								 item.upState = '1'
							 }
						})
			},
		  stopBtn(id){
				var arr = this.tableData;
				var _this = this;
						arr.map(function(item){
							if(item.id == id){
								_this.$refs[id].stop()
								  item.upState = '2'
								
							}
						})
				console.log()
			}
		},
		mounted(){
			var _this = this;
			this.getData()
			this.height =  "height:" + (document.body.clientHeight - 130) + "px"					
			window.onresize = function() {
				console.log(document.body.clientHeight)
				setTimeout(function() {
					_this.height =  "height:" + (document.body.clientHeight - 130) + "px"
					
					console.log(_this.height)
				}, 2)
			}
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