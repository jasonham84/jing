<template>
	<div id="LibraryManagement">
		<!--<h1>LibraryManagement</h1>
		<el-button type="primary" @click='foo'>主要按钮</el-button>-->
		<div  class="soushuo">
		<el-row>
			<el-col :span="16" style="height: 50px;display: flex;align-items: center;font-size: 12px;">
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
		   	  <p style="font-size: 12px;color: #a1a1a1;">一全部加载，共200个</p>
		   </el-col>
		</el-row>
		<transition name="slide-fade" 
			 v-on:before-enter="beforeEnter"
			v-on:after-leave="afterLeave">
		<el-row v-show="flage">
			<el-col :span="16" style="height: 50px;display: flex;align-items: center;">
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
		<div style="flex: 1;width: 100%;">			
			<div :class="{aa:flageClass,bb:!flageClass}" id="scroll-1">
		  <el-table
		    ref="multipleTable"
		    :data="tableData3"
		    tooltip-effect="dark"
		    style="width: 100%;font-size: 12px;"
		   >
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>		    
		    <el-table-column
		      prop="id"
		      label="编号"
		      width="60">
		   
		    </el-table-column>
		    <el-table-column
		      prop="singName"
		      label="歌曲名称"
		      width="80">
		    </el-table-column>
		    <el-table-column
		      prop="singerName"
		      label="歌手名称"
		      width="80"
		     >
		    </el-table-column>
		    
		     <el-table-column
		      prop="yuyan"
		      label="语言"
		      width="60"
		     >
		    </el-table-column>
		    <el-table-column
		      prop="movie"
		      label="画面"
		      width="80"
		    	>		    	
		    </el-table-column>
		    <el-table-column
		      prop="localtion"
		      label="地区"
		      width="60"
		    	>		    	
		    </el-table-column>
		     <el-table-column
		      prop="geshi"
		      label="格式"
		      width="60"
		    	>		    	
		    </el-table-column>
		    <el-table-column
		      prop="soundbanben"
		      label="声音版本"
		      width="80"
		    	>		    	
		    </el-table-column>
		    <el-table-column
		      prop="qufeng"
		      label="曲风"
		      width="80"
		    	>		    	
		    </el-table-column>
		    <el-table-column
		      prop="zhujiName"
		      label="专辑名称"
		      width="80"
		    	>		    	
		    </el-table-column>
		      <el-table-column
		      prop="yuanchang"
		      label="原唱"
		      width="60"
		    	>		    	
		    </el-table-column>
		      <el-table-column
		      prop="banchang"
		      label="绊唱"
		      width="60"
		    	>		    	
		    </el-table-column>
		      <el-table-column
		      prop="shangDate"
		      label="上传日期"
		      width="80"
		    	>		    	
		    </el-table-column>
		      <el-table-column
		      prop="chaozhuo"
		      label="操作"
		      width="60"
		    	>		    	
		    </el-table-column>
		    </el-table>	
			</div>
		</div>
		<div style="height: 30px;width:100%;position: absolute;bottom: 0;right: 0;background: gainsboro;">111</div>

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
			    flage:false,
			    flageClass:false,
			    tableData3: [{
			    	id:'001',
			    	singName:"稻香",
			    	singerName:'周杰伦',
			    	yuyan:'国语',
			    	movie:"原版MV",
			    	localtion:"大陆",
			    	geshi:"Mp4",
			    	soundbanben:"消音",
			    	qufeng:"影视金曲",
			    	zhujiName:"我想和你唱",
			    	company:"滚石纸片公司",
			    	yuanchang:"1",
			    	banchang:"2",
			    	shangDate:"2016-09-21 08:50:08",
			    	chaozhuo:"操作"
			    }],
			        multipleSelection: []
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
		     },
		     afterLeave(){
		     	this.flageClass = !this.flageClass
		     },
		     beforeEnter(){
		     	this.flageClass = !this.flageClass
		     }

		},
		mounted(){
//			this.open2()
		}
	}
</script>
<style>
	#LibraryManagement {
		
		
	}
	#LibraryManagement .el-input__inner{
		width: 150px;
	}
	#LibraryManagement .el-button{
		font-size: 12px;
	}
	.el-notification{
		width: 200px;
		
	}
</style>
<style scoped="scoped">
	#LibraryManagement{
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
	}
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
    .aa{
    	width: 99%;
    	height: 410px;
    	overflow: auto;
    	margin-right:0px ;
    	font-size: 12px;
    }
    .bb{
    	width: 99%;
    	height: 460px;
    	overflow: auto;
    	margin-right:0px ;
    	font-size: 12px;
    }
   #scroll-1::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #f0f0f0;
}
 
#scroll-1::-webkit-scrollbar
{
    width: 10px;
    background-color: #f0f0f0;
}
 
#scroll-1::-webkit-scrollbar-thumb
{
    border-radius: 20px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #cfd1d3;
}
#scroll-1::-webkit-scrollbar-thumb:hover{
	background-color: #a7acb1;
}   
#scroll-1::-webkit-scrollbar-thumb:active{
	background-color: #9da2a7;
}  
</style>