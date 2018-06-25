<template>
	<div id="LibraryManagement">
		<!--<h1>LibraryManagement</h1>
		<el-button type="primary" @click='foo'>主要按钮</el-button>-->
		<div  class="soushuo">
		<el-row>
			<el-col :span="14" style="height: 50px;display: flex;align-items: center;">
				<el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" size="mini">
				  <el-form-item label="歌曲名称">
				    <el-input v-model="formInline.songName" placeholder="请输入"></el-input>
				  </el-form-item>
				  <el-form-item label="歌手名称">
				    <el-input v-model="formInline.songerName" placeholder="请输入"></el-input>
				  </el-form-item>
				</el-form>
				
			</el-col>
			<el-col :span="2" style="height: 50px;display: flex;align-items: center;">
				<el-button type="primary" size="mini" @click="onSubmit">搜索</el-button>
			</el-col>
			<el-col :span="2" style="height: 50px;display: flex;align-items: center;">
				<transition name="slide-fade">
				<el-button  type="text" icon="el-icon-arrow-down" @click="zhanKai" v-if="!flage">展开</el-button>
				<el-button  type="text" icon="el-icon-arrow-up"  @click="zhanKai" v-else>收起</el-button>
				</transition>
			</el-col>
		   <el-col :span="4" style="height: 50px;display: flex;align-items: center;">
		   	  <p style="font-size: 14px;color: #a1a1a1;">一全部加载，共200个</p>
		   </el-col>
		</el-row>
		<transition name="slide-fade">
		<el-row v-show="flage">
			<el-col :span="14" style="height: 50px;display: flex;align-items: center;">
				<el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" size="mini">
				  <el-form-item label="专辑名称" >
				    <el-select v-model="formInline.albumName" placeholder="请选择">
				    	<el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="唱片公司">
				    <!--<el-input v-model="formInline.recordCompany" placeholder="请输入"></el-input>-->
				    <el-select v-model="formInline.recordCompany" placeholder="请选择">
				    	<el-option label="q" value="11"></el-option>
				    	<el-option label="q" value="1"></el-option>
				    	
				    </el-select>
				  </el-form-item>
				  
				</el-form>
			</el-col>
			<el-col :span="2" style="height: 50px;display: flex;align-items: center;">
				 <el-button type="primary" size="mini" @click="onSubmit">重置</el-button>
			</el-col>
			<el-col :span="2" style="height: 50px;display: flex;align-items: center;">
				<el-button type="primary" size="mini" @click="onSubmit">批量搜索</el-button>
			</el-col>
		</el-row>	
		</transition>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				formInline: {
			          songName: '',
			          songerName: '',
			          albumName:"",
			          recordCompany:""
			       },
			    flage:false
			}
		},
		methods:{
			foo(){
				this.$router.push('/LibraryManagement/VideoPlayback')
			},
			zhanKai(){
				this.flage = !this.flage
			},
			onSubmit(){
		        console.log('submit!');
		     },
		     open2(){
		        this.$notify({	
		          
		          message: '这是一闭的消息',
		          type:'success',
		          duration: 0,
		          offset: 60
		        });
		      }
		},
		mounted(){
			this.open2()
		}
	}
</script>
<style>
	#LibraryManagement .el-form--inline{
		margin-right: 0;
	}
	#LibraryManagement .el-input__inner{
		width: 150px;
	}
	.el-notification{
		width: 200px;
		
	}
</style>
<style scoped="scoped">
	#LibraryManagement .demo-form-inline{				
		height: 30px;		
	}
	#LibraryManagement .soushuo{
		
		border-bottom: 1px solid #ebebeb;
	}
	.slide-fade-enter-active {
	  transition: all .5s ease;
	}
	.slide-fade-leave-active {
	  transition: all .5s ease;
	}
	.slide-fade-enter, .slide-fade-leave-to
	 {
	  transform: translateY(-10px);
	  opacity: 0;
	}
</style>