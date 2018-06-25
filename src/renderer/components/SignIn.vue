<template>
	<div id="SignIn">
		<!--<h1 @click="foo">SignIn</h1>-->
		<div class="head">
			<div style="width: 900px;height: 100px;float: left;-webkit-app-region: drag"></div>
			<div style="width: 124px;height: 30px;float: left;-webkit-app-region: drag"></div>
			<div style="width: 124px;height: 30px;float: left;margin-top: 40px;-webkit-app-region: drag"></div>
		</div>
		<span class="head_span">
				<i class="iconfont icon-subtract tubiao" @click="min"></i>
				<i class="iconfont icon-close tubiao" @click="close"></i>
		</span>
		<div class="section">
			<span class="section_left">
			   <div class="section_left_div">
			   	  放置图片
			   </div>
			</span>
			<span class="section_right">
				<div class="section_right_div">
					<h2 style="color: #5a5a5a;">鲸唱云音乐</h2>
					<p style="margin-bottom: 0;color: #929292;">我是一句看起来很长的Log</p>
					<span class="section_right_div_span1">
					    <span>
					    	<input type="email" v-model="user" placeholder="账号"/>					    	
					    </span>	
					    <span>					    	
					    	<input type="password" v-model="password" placeholder="密码"/>
					    </span>	
					</span>
					<span class="section_right_div_span2">
						 <el-checkbox v-model="checked" @change='automaticLogon'>自动登录</el-checkbox>
						 <el-button type="text" @click="clearPassWord">忘记密码</el-button>
					</span>
					 <el-button type="primary" size="medium" :disabled="dengluChecked" style="width: 100%;" @click='denglu'>登录</el-button>
					 <!--<el-button type="primary" size="medium" style="width: 100%;" @click='foo'>登录1</el-button>-->
				</div>				
			</span>			
		</div>
	</div>
</template>

<script>
	
	const ipcRenderer = require('electron').ipcRenderer;
    const session = require('electron').remote.session;
	export default {
		data(){
			return{
				checked:false,
				user:"",
				password:""				
			}
		},
		computed:{
			dengluChecked:function(){
				if(this.user!=""&&this.password!=""){					
					return false
				}else{					
					return true
				}				
			}
		},
		methods:{
	
            denglu(){
            	var date = new Date()
            	console.log(date.getTime())            	
				var obj = {
					user: this.user,
					password: this.password,
					time:date.getTime()
				}
				var str = JSON.stringify(obj)
				localStorage.setItem("UserInformation",str)
				this.$router.push("/Main")
			},
			foo(){
				var data = localStorage.getItem('UserInformation')
				var timeNew = new Date().getTime()
				var num = 15*1000*24*60*60				
				if(data){
					var timeOld = JSON.parse(data).time
					var timeCha = timeNew - timeOld
					var flage = localStorage.getItem("automaticLogon") =="1"? true : false;
					var flage1 = localStorage.getItem("clearPassWord") == "1"? true :false;
					if(timeCha < num){
						this.user = JSON.parse(data).user 
						if(flage1){
							this.password = ""
						}else{
							this.password = JSON.parse(data).password	
						}													            	
						var obj = {
							user: this.user,
							password: this.password,
							time:timeNew
						}
						var str = JSON.stringify(obj)
						localStorage.setItem("UserInformation",str)
						if(flage&&this.password!=""){
							this.checked = true
							this.$router.push("/Main")					
						}
					}else{
						localStorage.removeItem('UserInformation')
					}
					
				}
			},
			min(){
				ipcRenderer.send('window-minSize')
			},
			close(){
				ipcRenderer.send('window-close')
			},
			automaticLogon(flage){
				if(flage){
					localStorage.setItem('automaticLogon','1')
					localStorage.removeItem("clearPassWord")
				}else{
					localStorage.setItem('automaticLogon','0')
					localStorage.setItem('clearPassWord','1')
				}
				
			},
			clearPassWord(){
				localStorage.setItem('clearPassWord','1')
				this.password = ""
				this.checked = false
				localStorage.removeItem("automaticLogon")
			},		

		},
		
		mounted(){
             this.foo()   
		}
	}
</script>
<style>
	body{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	
</style>
<style scoped="scoped">
	
	#SignIn{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;		
	}
	#SignIn .tubiao{
		font-size: 30px;
		font-weight: 700;
		cursor: pointer;
	}
	#SignIn .head{
		height: 100px;
		background: #ececec;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		position: relative;
	}
	#SignIn .head_span{
		position: absolute;
		right: 20px;
		top: 30px;
		display: block;
		width: 100px;		
		height: 30px;
		color: black;
		display: flex;
		align-items: center;
		justify-content: space-around;		
	}
	#SignIn .section{
		flex: 1;
		background: #ececec;
		display: flex;			
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;	
	}
	#SignIn .section_left{
		width: 50vw;
		height: 100%;		
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-app-region: drag
	}
	#SignIn .section_left_div{
		width: 100px;
		height: 100px;
		margin-top: -50px;
		background: black;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	    font-size: 20px;
	    border-radius: 10px;
	}
	#SignIn .section_right{
		width: 50vw;
		height: 100%;		
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	#SignIn .section_right_div{
		-webkit-user-select:none;				
		width: 280px;
		height: 340px;
		margin-top: -50px;
		text-align: center;
		background: white;
		border-radius: 8px;
		padding: 0 20px;
		box-sizing: border-box;
	}
	#SignIn .section_right_div_span1{
		display: flex;
		width: 100%;
		height: 120px;		
		flex-direction: column;
	}
	#SignIn .section_right_div_span1 span{
		display: flex;
		border-bottom: 1px solid #d7d7d7;
		height: 60px;
		box-sizing: border-box;
		padding-top: 17px;		
	}
	#SignIn .section_right_div_span1 span input{
		border: 0;
		outline: none;
		width: 100%;
		height: 40px;		
		font-size: 18px;
	}
	#SignIn .section_right_div_span2{
		display: flex;
		height: 50px;		
		align-items: center;
		justify-content: space-between;
	}
</style>