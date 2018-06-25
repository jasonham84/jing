<template>
	<div id="Main" style="-webkit-user-select:none;overflow: hidden;" @click="goo">
		<el-container class="main">
	    <el-header style="height: 80px;border-top-left-radius: 10px;border-top-right-radius: 10px;display: flex;background: #434343;">
	    	
	    		<div style="height: 100%;width: 180px;display: flex;justify-content: center;align-items: center;-webkit-app-region: drag;">
	    			<div style="width: 160px;height: 30px;color: white;border-radius: 5px;background: #6a6a6a;text-align: center;line-height: 30px;margin-left: -20px;">LOGO</div>
	    		    
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
	    				<div style="flex: 1;-webkit-app-region: drag;"></div>
	    			</div>
	    			<div style="width: 100%;height: 25px;-webkit-app-region: drag;"></div>
	    		</div>
	    		<div style="width: 140px;height: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;position: relative;">
	    			<div style="width: 110%;height: 26px;position: absolute;top: 0;right: -20px;border-top-right-radius: 10px;-webkit-app-region: drag;"></div>
	    			<div style="height: 22px;width: 100%;border-left: 2px solid white;display: flex;justify-content: space-around;align-items: center;padding: 0 10px;">
	    				<i class="iconfont icon-subtract tubiao"></i>
	    				<i class="iconfont icon-quanping tubiao"></i>
	    				<i class="iconfont icon-close tubiao"></i>
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
				          <span>曲库管理</span>				        
				      </el-menu-item>
				      <el-menu-item index="CustomManagement">
				        <i class="el-icon-menu"></i>
				        <span slot="title">定制管理</span>
				      </el-menu-item>
				      <h5 style="margin: 0;padding: 0;height: 60px;line-height: 60px;font-size:14px;font-weight: normal;color: #ababab;text-indent:-110px;">上传管理</h5>
				      <el-menu-item index="SongsUploaded">
				        <i class="el-icon-document"></i>
				        <span slot="title">歌曲上传</span>
				      </el-menu-item>
				      <el-menu-item index="Uploading">
				        <i class="el-icon-setting"></i>
				        <span slot="title">正在上传</span>
				      </el-menu-item>
				    </el-menu>
				</el-col>	    		
	    	</el-row>	    	
	    </el-aside>
	    <el-main class="contentRight">
	    	<el-row style="height: 50px;borderBottom: 1px solid #E4E4E4;display: flex;">
	    		<div  style="height: 100%;width:150px;display: flex;justify-content: space-around;align-items: center;" class="contentRight_header">
	    			<i class="el-icon-arrow-left" @click="RouterBack" style="cursor: pointer;"></i>
	    			<i class="el-icon-arrow-right" @click="RouterGo" style="cursor: pointer;"></i>
	    			<i class="el-icon-refresh" style="cursor: pointer;"></i>
	    			
	    		</div>
	    		<div  style="height: 100%;width: 500px;">
	    			<div style="width: 100%;height: 24px;margin-top: 13px;border-left: 1px solid #e4e4e4;padding-left:20px;display: flex;align-items: center;">
	    				<HistoryRouter/>
	    			</div>
	    		</div>
	    	</el-row>
	    	<div class="contentRightDiv">
	    		<router-view></router-view>
	    	</div>
	    </el-main>
	    </el-container>
	    </el-container>
</div>
</template>

<script>
	import HistoryRouter from './CustomComponents/HistoryRouter';
	export default{
		components:{ HistoryRouter },
		data(){
			return{
				
				isArray:'background: #f1f1f1;',
				flage:false
			}
		},
		methods:{
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
			foo(){
				this.flage = !this.flage
			},
			goo(){
				this.flage = false
			}
			
			
		},
	    watch:{
	        $route (newVal,oldVal) {
	        	console.log('ppp')
	         }
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
.el-popover{
	min-width: 80px;
}

.headHover:hover{
		background: yellow;
	}
.a{
	background: yellow;
}
.b{
	display: block;
}
/*#Main .el-menu-item:nth-child(1){
	background: #F1F1F1;
}	*/
</style>

<style scoped="scoped">
	
	#Main{
		height: 100vh;
		overflow: hidden;
		margin: 0;
		padding: 0;
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
  	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;	
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