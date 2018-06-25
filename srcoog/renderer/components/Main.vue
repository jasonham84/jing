<template>
	<div id="Main" style="-webkit-user-select:none;">
		<el-container class="main">
	    <el-header style="height: 80px;-webkit-app-region: drag">Header</el-header>
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
	    		<div  style="background: yellow;height: 100%;width:150px;display: flex;justify-content: space-around;align-items: center;" class="contentRight_header">
	    			<i class="el-icon-arrow-left" @click="RouterBack" style="cursor: pointer;"></i>
	    			<i class="el-icon-arrow-right" @click="RouterGo" style="cursor: pointer;"></i>
	    			<i class="el-icon-refresh" style="cursor: pointer;"></i>
	    			
	    		</div>
	    		<div  style="background: red;height: 100%;width: 500px;">
	    			<div style="background: yellow;width: 100%;height: 24px;margin-top: 13px;border-left: 1px solid #e4e4e4;padding-left:20px;display: flex;align-items: center;">
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
				
				isArray:'background: #f1f1f1;'
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
	}
#Main .el-menu-vertical-demo{
	border: 0;
}	
#Main .el-menu-item:focus, .el-menu-item:hover {
	background: #f1f1f1;
}
/*#Main .el-menu-item:nth-child(1){
	background: #F1F1F1;
}	*/
</style>

<style scoped="scoped">
	
	#Main{
		height: 100vh;
		
		margin: 0;
		padding: 0;
	}
	#Main .main{
		height: 100vh;
		display: flex;
		flex-direction: column;
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
  }
  .contentRight{
  	display: flex;
  	flex-direction: column;
  	
  	
  }
  .contentRightDiv{
  	flex: 1;
  	
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