<template>
	<div id="Main" style="-webkit-user-select:none;overflow: hidden;" @click="goo">
		<el-container class="main">
	    <el-header style="height: 80px;display: flex;background: #7f74ef;">
	    	
	    		<div style="height: 100%;width: 180px;display: flex;justify-content: center;align-items: center;-webkit-app-region: drag;">
	    			<div style="width: 160px;height: 30px;color: white;border-radius: 5px;background: #5849f0;text-align: center;line-height: 30px;margin-left: -20px;">LOGO</div>
	    		    
	    		</div>
	    		<div style="height: 100%;flex: 1;">
	    			<div style="width: 100%;height: 25px;-webkit-app-region: drag;"></div>
	    			<div style="width: 100%;height: 30px;display: flex;flex-direction: row-reverse;">
	    				<div style="height: 100%;color:white;width: 100px;display: flex;align-items: center;justify-content: center;padding-right: 20px;">	    					
	    					<span style="display: block;width: 30px;height: 30px;border-radius: 50%;margin: 0 5px;">
	    						<img src="../../../build/icons/256x256.png" style="width: 100%;height: 100%;"/>
	    					</span>	    				
							 <div style="cursor: pointer;position: relative;" @click.stop.self="foo">
							   hover
							   <div v-show="flage" style="padding: 10px 0;position: absolute;width: 100px;background: #fff;z-index: 10;left: 50%;top: 46px;margin-left: -50px;border-radius: 5px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);border: 1px solid #ebeef5;">
								   	<div class="hoverList">修改密码</div>
								   	<div class="hoverList">退出登录</div>							  					   	 
							   	<div class="shanjiao">
							   		<span></span>
							   	</div>
							   </div>
							 </div>
	    					<i class="el-icon-arrow-down"></i>
	    				
	    				</div>
	    				<div style="flex: 1;display: flex;">
	    				   <div class="headBtn">
	    				   	 <span class="headBtn_back">
	    				   	 	<i class="el-icon-arrow-left el-icon-arrow-left1"></i>
	    				   	 </span>
	    				   	 <span class="headBtn_refresh" @click="pageRefresh">
	    				   	 	<i class="el-icon-refresh el-icon-refresh1"></i>
	    				   	 </span>
	    				   	 <b style="display: block;margin: 3px 10px ;background:#a8a0fb;height: 24px;width: 1px;margin-right: 30px;" v-show="shugangFlage"></b>
	    				   	 <!--
                                	
                                	描述：曲库页面显示
                                -->
	    				   	  <span :class="{headBtn_stop1:selectFlage, headBtn_stop:!selectFlage}" v-show="pageBtn1" @click="exportFile">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">导出</i>
	    				   	 </span>
	    				   	  <span :class="{headBtn_stop1:selectFlage, headBtn_stop:!selectFlage}" v-show="pageBtn1" @click="delected">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">删除</i>
	    				   	 </span>
	    				   	 <!--
                                	
                                	描述：定制页面显示
                                -->
									<span :class="{headBtn_stop1:selectFlage1, headBtn_stop:!selectFlage1}" v-show="pageBtn2" @click="UploadFileOK">
										<i class="el-icon-upload el-icon-stop1"></i>
										<i class="headBtn_stop_font">确认上传</i>
									</span>						
	    				   	<span :class="{headBtn_stop1:selectFlage1, headBtn_stop:!selectFlage1}" v-show="pageBtn2" @click="makeFile">
	    				   	 	<i class="el-icon-printer el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">制作</i>
	    				   	 </span>
	    				   	  <span :class="{headBtn_stop1:selectFlage1, headBtn_stop:!selectFlage1}" v-show="pageBtn2" @click="exportFile1">
	    				   	 	<i class="el-icon-tickets el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">导出</i>
	    				   	 </span>
	    				   	 <!--
                                	
                                	描述：歌曲导入页面显示
                                -->
	    				   	<span class="headBtn_stop1 fileinput-button" v-show="pageBtn3">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">歌曲导入</i>
										<input type="file" ref="file" @change="DRfoo"/>
	    				   	 </span>
	    				   	  <span :class="{headBtn_stop1:selectFlage2, headBtn_stop:!selectFlage2}" v-show="pageBtn3">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">全部上传</i>
	    				   	 </span>
	    				   	 <span :class="{headBtn_stop1:selectFlage2, headBtn_stop:!selectFlage2}" v-show="pageBtn3" @click="delected2">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font">全部清除</i>
	    				   	 </span>
	    				   	 <!--
                                	
                                	描述：正在上传页面显示
                                -->
                    <span class="headBtn_stop1" v-show="pageBtn4" @click="StopUpload">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font" v-show="!selectFlage3">全部暂停</i>
										<i class="headBtn_stop_font" v-show="selectFlage3">暂停</i>
	    				   	 </span>
	    				   	  <span class="headBtn_stop1" v-show="pageBtn4" @click="StartUpload">
	    				   	 	<i class="el-icon-caret-right el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font" v-show="!selectFlage3">全部开始</i>
										<i class="headBtn_stop_font" v-show="selectFlage3">开始</i>

	    				   	 </span>
	    				   	 <span class="headBtn_stop1" v-show="pageBtn4" @click="DelectUpload">
	    				   	 	<i class="el-icon-delete el-icon-stop1"></i>
	    				   	 	<i class="headBtn_stop_font" v-show="!selectFlage3">全部清除</i>
										<i class="headBtn_stop_font" v-show="selectFlage3">清除</i>
	    				   	 </span>   
	    				   </div>
	    					<div class="head_kong" style="flex: 1;-webkit-app-region: drag;"></div>
	    				</div>
	    			</div>
	    			<div style="width: 100%;height: 25px;-webkit-app-region: drag;"></div>
	    		</div>
	    		<div style="width: 140px;height: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;position: relative;">
	    			<div style="width: 110%;height: 26px;position: absolute;top: 0;right: -20px;border-top-right-radius: 10px;-webkit-app-region: drag;"></div>
	    			<div style="height: 22px;width: 100%;border-left: 1px solid #a8a0fb;display: flex;justify-content: space-around;align-items: center;padding: 0 10px;">
	    				<i class="iconfont icon-subtract tubiao" v-tishi:30="msg[0].content" @click="minSize"></i>
	    				<i class="iconfont icon-quanping tubiao" v-tishi:30="msg[1].content" @click="changeSize" v-show="screenFlage"></i>
	    				<i class="iconfont icon-bianji tubiao" v-tishi:30="msg[6].content" @click="changeSize" v-show="!screenFlage"></i>
	    				<i class="iconfont icon-close tubiao" v-tishi:30="msg[2].content" @click="Close"></i>
	    			</div>
	    			<div style="width: 110%;height: 26px;position: absolute;bottom: 0;right: -20px;-webkit-app-region: drag;"></div>
	    			<div style="width: 30px;height: 28px;position: absolute;top: 26px;right: -20px;-webkit-app-region: drag;"></div>
	    			<div style="width: 20px;height: 28px;position: absolute;top: 26px;right: 34px;-webkit-app-region: drag;"></div>
	    			<div style="width: 22px;height: 28px;position: absolute;top: 26px;right: 82px;-webkit-app-region: drag;"></div>
	    			<div style="width: 20px;height: 80px;position: absolute;top: 0;left: -6px;-webkit-app-region: drag;"></div>
	    		</div>
	    		
	    	
	    </el-header>
	    <el-container class="content">
	    <el-aside width="200px">
	    	<el-row>
	    		<el-col :span="24">
				    <h5 style="height: 60px;background: white;margin: 0;padding: 0;"></h5>
				    <el-menu				      			      
				      active-text-color="#333333"
				      class="el-menu-vertical-demo"				      
				      @select='ItemSelect'
				     >
				      <el-menu-item index="LibraryManagement" :style="isArray">				        
				          <i class="el-icon-location"></i>
				          <span>曲库管理　　</span>
									
				      </el-menu-item>
				      <el-menu-item index="CustomManagement">
				        <i class="el-icon-menu"></i>
				        <span slot="title">定制管理　　</span>
				      </el-menu-item>
				      <h5 style="margin: 0;padding: 0;height: 60px;line-height: 60px;font-size:14px;font-weight: normal;color: #ababab;text-indent:-110px;">上传管理</h5>
				      <el-menu-item index="SongsUploaded">
								
				        <i class="el-icon-document"></i>
								<span >歌曲导入  <el-badge class="mark" :value="DRnumber"  :max="99" /></span>
				       <!-- <i class="el-icon-document"></i>
									<el-badge :value="200" :max="1000" class="item">
									<el-button type="text" size="mini">文字按钮</el-button>
								</el-badge>-->
				      </el-menu-item>
				      <el-menu-item index="Uploading">
				        <i class="el-icon-setting"></i>
				        <span slot="title">正在上传 <el-badge class="mark" :value="UPnumber"  :max="99"/></span>
				      </el-menu-item>
				    </el-menu>
				</el-col>	    		
	    	</el-row>	    	
	    </el-aside>
	    <el-main class="contentRight">
	    	<el-row style="height: 50px;borderBottom: 1px solid #E4E4E4;display: flex;display: none;">
	    		<div  style="height: 100%;width:150px;display: flex;justify-content: space-around;align-items: center;" class="contentRight_header">
	    			<i class="el-icon-arrow-left" @click="RouterBack" style="cursor: pointer;" v-tishi:30="msg[3].content"></i>
	    			<i class="el-icon-arrow-right" @click="RouterGo" style="cursor: pointer;" v-tishi:30="msg[4].content"></i>
	    			<i class="el-icon-refresh" style="cursor: pointer;" v-tishi:30="msg[5].content"></i>
	    			
	    		</div>
	    		<div  style="height: 100%;width: 500px;">
	    			<div style="width: 100%;height: 24px;margin-top: 13px;border-left: 1px solid #e4e4e4;padding-left:20px;display: flex;align-items: center;">
	    				<HistoryRouter @add-parent-total="addParentTotle"/>
	    			</div>
	    		</div>
	    	</el-row>
	    	<div class="contentRightDiv">
					<keep-alive>
	               <router-view  v-if="$route.meta.keepAlive"></router-view>
	        </keep-alive>
                 <router-view v-if="!$route.meta.keepAlive"></router-view>
	    	</div>
	    </el-main>
	    </el-container>
	    </el-container>
</div>
</template>

<script>
	const {ipcRenderer} = require('electron')
	const fs = require("fs")
	const path = require("path")
	let currentWindow = require('electron').remote.getCurrentWindow()
	import HistoryRouter from './CustomComponents/HistoryRouter';
	import Bus from './bus.js'
	export default{
		components:{ HistoryRouter },
		data(){
			return{
				isArray:'background: #f1f1f1;',
				flage:false,
				screenFlage:true,
				selectFlage:false,
				selectFlage1:false,
				selectFlage2:false,
				selectFlage3:false,
				msg:[
				 {content:'缩小'},
				 {content:'放大'},
				 {content:'关闭'},
				 {content:"后退"},
				 {content:"前进"},
				 {content:"刷新"},
				 {content:"还原"}				 
				],
				pageBtn1:false,
				pageBtn2:false,
				pageBtn3:false,
				pageBtn4:false,
				shugangFlage:true
			}
		},
		computed: {
		  UPnumber() {
				return this.$store.state.Counter.data.length; 
			},
			DRnumber() {
				return this.$store.state.Counter.DRnumber; 
			}
		},
		methods:{
		    changeSize(){
		    	
		    	
		      	var flage = currentWindow.isMaximized()
		      	this.screenFlage = flage
		    	
		      	if(flage){
		      		
		      		ipcRenderer.send('window-restore')
		      	}else{
		      		
		      		ipcRenderer.send('window-maxSize')
		      	}
		    },
			Close(){
				var _this = this
				ipcRenderer.send('window-close')
				ipcRenderer.on('closeChild',function(){
					_this.$message({
			          message: '请关闭视频窗口',
			          type: 'warning'
			        });
					
				})
			},
			minSize(){
				ipcRenderer.send('window-minSize')
			},
			ItemSelect(str){
				this.isArray=""
				this.$router.push('/'+str)
			},
			RouterBack(){
				
				this.$router.back(-1)
				
			},
			RouterGo(){
				console.log("q")
				this.$router.go(1)
				
			},
			pageRefresh(){
				this.$router.push('/Refresh')			
			},
			foo(){
				this.flage = !this.flage
			},
			goo(){
				this.flage = false
			},
			addParentTotle(str){
				console.log(str,"ppppoo444444444o")
				this.pageBtn1 = false
				this.pageBtn2 = false
				this.pageBtn3 = false
				this.pageBtn4 = false
				this.shugangFlage = true
				switch(str){
					case 'LibraryManagement':
					    this.pageBtn1 = true;
					break;
					case 'CustomManagement':
					    this.pageBtn2 = true;
					break;
					case 'SongsUploaded':
					    this.pageBtn3 = true;
					break;
					case 'Uploading':
					    this.pageBtn4 = true;
					break;
					case "editPage":
					   this.shugangFlage = false;
					break;
				}
				
			},
			delected(){
				Bus.$emit('delected')
			},
			exportFile(){
				Bus.$emit("exportFile")
			},
			
			
			
			
			UploadFileOK(){
				if(this.selectFlage1){
					Bus.$emit('UploadFileOK')
				}
				
			},
			makeFile(){
				if(this.selectFlage1){
				  Bus.$emit('makeFile')
				}
			},
			exportFile1(){
				if(this.selectFlage1){
				  Bus.$emit("exportFile1")
				}
			},
			DRfoo(){
				var currentFile = this.$refs.file.files[0]	
				console.log("Main_DRfoo")
				Bus.$emit("DRfoo",currentFile)
				this.$refs.file.value = ""
			}, 
			delected2(){
				if(this.selectFlage2){
					Bus.$emit('delected2')
				}
			},
			
			
			StopUpload(){
				
					Bus.$emit("StopUpload")
				
			},
			StartUpload(){
				
					Bus.$emit("StartUpload")
				
			},
			DelectUpload(){
				
					Bus.$emit("DelectUpload")
				
			},
			getFile(){	
				var file=`${__dirname}/../assets/data.json`;				
				var _this = this;
				var DRnumber = 0;
				var UPnumber = 0;
				fs.readFile(file,function(error,data){
					 if(error){
						 console.log(error)
					 }else{		
					    var arr = JSON.parse(data)
							var arr1 = _this.$store.state.Counter.data
							arr.map(function(item){
								 if(item.content.songeState != "正在上传"){
									 DRnumber++;
                  
								 }else{
									 UPnumber++
                   var flage = true;
									 arr1.map(function(item1){
										  if(item1.id == item.id){
												flage = false;
												return;
											}
									 })
									 if(flage){
										_this.$store.commit("hoo",item)
									 }
									 
									 // arr1.push(item)								 
								 }
							})							 
								_this.$store.commit("DRnumber1", DRnumber)	
								_this.$store.commit("UPnumber1", UPnumber)	

					 }
				})			
			}

		},
	    watch:{
	        $route (newVal,oldVal) {
	        	
	         }
        },
	    mounted(){
	    	var _this = this
				this.getFile()
				
	      	window.onresize=function(){
	      		console.log(currentWindow.isMaximized())
	      		   
	      			_this.screenFlage = !currentWindow.isMaximized()
	      		
	      	}
	      Bus.$on('val',function(data){
	        	  if(data == '1'){
	        	  	  _this.selectFlage = true
	        	  }else{
	        	  	 _this.selectFlage = false
	        	  }
	        })
				Bus.$on('val1',function(data){
						if(data == '1'){
								_this.selectFlage1 = true
						}else{
							_this.selectFlage1 = false
						}
				})
				Bus.$on('val2',function(data){
						if(data == '1'){
								_this.selectFlage2 = true
						}else{
							_this.selectFlage2 = false
						}
				})
				Bus.$on('val3',function(data){
						if(data == '1'){
								_this.selectFlage3 = true
						}else{
							_this.selectFlage3 = false
						}
				})
			Bus.$on("getNumber",function(){
				_this.getFile()
			 })
	    }
		
	}
</script>
<style>
body{
		margin: 0;
		padding: 0;
		font-size: 12px !important;
	}
#Main .el-menu-vertical-demo{
	border: 0;
}	
#Main .el-menu-item:focus, .el-menu-item:hover {
	background: #f1f1f1;
}
#Main .el-popover{
	min-width: 80px;
}




/*#Main .el-menu-item:nth-child(1){
	background: #F1F1F1;
}	*/
</style>

<style scoped="scoped">
	  .fileinput-button {
            position: relative;
            display: inline-block;
            overflow: hidden;
        }

        .fileinput-button input{
            position: absolute;
            left: 0px;
            top: 0px;
            opacity: 0;
						height: 30px;
						cursor: pointer;
            -ms-filter: 'alpha(opacity=0)';
        }
	#Main{
		height: 100vh;
		overflow: hidden;
		margin: 0;
		padding: 0;
		font-family: "微软雅黑";
		
	}
	#Main .tubiao{
		color: white;
		font-size: 24px;
		cursor: pointer;
	}
	#Main .main{
		height: 100vh;
		display: flex;
		flex-direction: column;
		
	}
	
	#Main .headBtn{
		height: 100%;
		margin-left:10px ;
		display: flex;				
	}
	#Main .headBtn span{
		display: block;
		height: 28px;		
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border: 1px solid #b6bcce;
		margin-right: 20px;
		
	}
	
	#Main .headBtn .headBtn_back,#Main .headBtn .headBtn_refresh{
		border: 1px solid white;		
	}		
	#Main .headBtn .headBtn_back .el-icon-arrow-left1{
		color: white;
	}
	#Main .headBtn span:hover .el-icon-refresh1{
		color: white;
	}
	
	/*#Main .headBtn span:hover .el-icon-stop1{
		color: white;
	}*/
	/*#Main .headBtn span:hover .headBtn_stop_font{
		color: white;
	}*/
    
	
  
	
	
	#Main .headBtn .headBtn_stop1:active{
		background: #8f86f2;
	}
	#Main .headBtn .headBtn_back{
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		padding:0 10px;
		
	}
	#Main .headBtn .headBtn_back .el-icon-arrow-left1{
		font-size: 20px;
		color: white;
		
	}
	
	#Main .headBtn .headBtn_refresh{
		border-radius: 5px;
		padding: 0 10px;
	}
	#Main .headBtn .headBtn_refresh .el-icon-refresh1{
		font-size:20px;
		color: white;
	}
	
	#Main .headBtn .headBtn_stop{
		border-radius: 5px;
		padding: 0 8px;
		cursor: default;
		
	}	
	#Main .headBtn .headBtn_stop .el-icon-stop1{
		font-size:20px;
		color: #b6bcce;
	}
	#Main .headBtn .headBtn_stop .headBtn_stop_font{
		font-style: normal;
		color: #b6bcce;
		margin-left: 5px;
	}
	
	
	
	

	#Main .headBtn .headBtn_stop1{
		border-radius: 5px;
		padding: 0 8px;
		cursor: pointer;
		border: 1px solid white;
	}	
	#Main .headBtn .headBtn_stop1 .el-icon-stop1{
		font-size:20px;
		color: white;
	}
	#Main .headBtn .headBtn_stop1 .headBtn_stop_font{
		font-style: normal;
		color: white;
		margin-left: 5px;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.hoverList{
		text-align: center;
		height: 30px;
		color: #797979;
		font-size: 14px;
		line-height: 30px;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.hoverList:hover{
		background: #ececee;
	}
	.shanjiao{
		position: absolute;
		width: 0;
		height: 0;
		border-width: 0 6px 6px;
		border-style: solid;
		border-color: transparent transparent #ebeef5; 		
		left: 50%;
		margin-left: -3px;
		top: -6px;		
	}
	.shanjiao span{
		display: block;
		width: 0;
		height: 0;
		border-width: 0 6px 6px;
		border-style: solid;
		border-color: transparent transparent #fff; 		
		margin-left: -6px;	
		margin-top: 2px;	
	}
	.el-header {
    background-color: #f5f5f9;
    color: #333;
    text-align: center;
   
  }
  .contentRight_header{
  	font-size: 24px;
  	line-height: 50px;
  }
  .content{
  	flex: 1;
  	background: white;
  	border: 1px solid #adabab;
  	box-sizing: border-box;
  	border-top: none;  	
  	/*border-bottom-left-radius: 100px;
	border-bottom-right-radius: 100px;	*/
  }
  .contentRight{
  	display: flex;
  	flex-direction: column;
  	
  	
  }
  .contentRightDiv{
  	flex: 1;
  	overflow: hidden;
  	
  }
  .el-aside {
    
    color: #333;
    border-right: 1px solid #E4E4E4;
    text-align: center;
    box-sizing: content-box;
   
  }
  
  .el-main {
    
    color: #333;
   
    text-align: center;
    
    padding: 0;
  }
</style>