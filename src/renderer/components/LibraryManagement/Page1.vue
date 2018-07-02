<template>
	<div id="LibraryManagement">
		<!--<h1>LibraryManagement</h1>
		<el-button type="primary" @click='foo'>主要按钮</el-button>-->
		<div  class="soushuo">
		<el-row>
			<el-col :span="20" style="height: 50px;display: flex;align-items: center;font-size: 12px;">
				<el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" size="mini">
				  <el-form-item label="歌曲名称">
				    <el-input v-model="formInline.songName" placeholder="请输入"></el-input>
				  </el-form-item>
				  <el-form-item label="歌手名称">
				    <el-input v-model="formInline.songerName" placeholder="请输入"></el-input>
				  </el-form-item>
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
			<el-col :span="1" style="height: 50px;display: flex;align-items: center;margin-right: 20px;">
				<el-button type="primary" size="mini" @click="onSubmit" v-tishi:30="msg[4].content">搜索</el-button>
			</el-col>
			<el-col :span="2" style="height: 50px;display: flex;align-items: center;">
				<el-button  size="mini" @click="onSubmit" v-tishi:60="msg[5].content">批量搜索</el-button>
			</el-col>
			<!--<el-col :span="2" style="height: 50px;display: flex;align-items: center;">
				<transition name="slide-fade">
				<el-button  type="text" icon="el-icon-arrow-down" @click="zhanKai" v-if="!flage" v-tishi:60="msg[5].content">展开</el-button>
				<el-button  type="text" icon="el-icon-arrow-up"  @click="zhanKai" v-else>收起</el-button>
				</transition>
			</el-col>
		   <el-col :span="4" style="height: 50px;display: flex;align-items: center;">
		   	  <p style="font-size: 12px;color: #a1a1a1;">一全部加载，共200个</p>
		   </el-col>-->
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
		<div style="flex: 1;width: 100%;position: relative;" id="box">			
			<div :class="{aa:flageClass,bb:!flageClass}" :style="height" id="scroll-1" @contextmenu.stop='rightMeun'>
		  <el-table
		    ref="multipleTable"
		    :data="tableData3"
		    tooltip-effect="dark"
		    @row-contextmenu="hoo"
		    style="width: 100%;font-size: 12px;color: #666666;"
		   >
		    <el-table-column
		      type="selection"
		      min-width="55">
		    </el-table-column>		    
		    <el-table-column
		      prop="id"
		      label="编号"
		      min-width="50">
		   
		    </el-table-column>
		    <el-table-column
		      prop="singName"
		      label="歌曲名称"
		      min-width="70">
		    </el-table-column>
		    <el-table-column
		      prop="singerName"
		      label="歌手名称"
		      min-width="80"
		     >
		    </el-table-column>
		    
		     <el-table-column
		      prop="yuyan"
		      label="语言"
		      min-width="60"
		     >
		    </el-table-column>
		    <el-table-column
		      prop="movie"
		      label="画面"
		      min-width="80"
		    	>		    	
		    </el-table-column>
		    <el-table-column
		      prop="localtion"
		      label="地区"
		      min-width="60"
		    	>		    	
		    </el-table-column>
		     <el-table-column
		      prop="geshi"
		      label="格式"
		      min-width="60"
		    	>		    	
		    </el-table-column>
		    <el-table-column
		      prop="soundbanben"
		      label="声音版本"
		      min-width="80"
		    	>		    	
		    </el-table-column>
		    <el-table-column
		      prop="qufeng"
		      label="曲风"
		      min-width="80"
		    	>		    	
		    </el-table-column>
		    <el-table-column
		      prop="zhujiName"
		      label="专辑名称"
		      min-width="80"
		    	>		    	
		    </el-table-column>
		      <el-table-column
		      prop="yuanchang"
		      label="原唱"
		      min-width="60"
		    	>		    	
		    </el-table-column>
		      <el-table-column
		      prop="banchang"
		      label="绊唱"
		      min-width="50"
		    	>		    	
		    </el-table-column>
		      <el-table-column
		      prop="shangDate"
		      label="上传日期"
		      min-width="80"		      
		    	>
		    <!--<template slot-scope="scope">
	        <el-popover trigger="hover" placement="top">
	          <p>日期：{{ scope.row.shangDate }}</p>	          
	          <div slot="reference" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
	            <p size="mini">{{ scope.row.shangDate }}</p>
	          </div>
	        </el-popover>
	       </template>-->
		    </el-table-column>
		      <el-table-column		      
		      label="操作"
		      min-width="162"
		    	>	
		    	<template slot-scope="scope">
		    	<i class="iconfont icon-bofang" style="font-size: 20px;cursor: pointer;margin: 0 5px;" v-tishi:30="msg[0].content"></i>
		    	<i class="iconfont icon-bianji" style="font-size: 20px;cursor: pointer;margin: 0 5px;" v-tishi:30="msg[1].content"></i>
		    	<i class="iconfont icon-dianliangqiang_daohang_tihuan_moren" style="font-size: 20px;cursor: pointer;margin: 0 5px;" v-tishi:30="msg[2].content"></i>
		    	<i class="iconfont icon-shanchu" style="font-size: 20px;cursor: pointer;margin: 0 5px;" v-tishi:30="msg[3].content"></i>
		    	</template>
		    </el-table-column>
		    </el-table>	
			</div>
		</div>
		<div style="height: 50px;width:100%;position: absolute;bottom: 0;right: 0;background: white;padding: 0 20px;box-sizing: border-box;">
			  <div class="block lastBlock">
			    <span class="demonstration" style="color: #999999;">已加载200条数据</span>
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"			      
			      :page-sizes="[100, 200, 300, 400]"
			      :page-size="100"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="4000">
			    </el-pagination>
			  </div>
			
		</div>
       	<div class="rightBox" ref='pppp'>
       		<ul>
       			<li @click="newBox">播放视频</li>
       			<li>编辑</li>
       			<li>替换</li>
       			<li>删除</li>
       		</ul>
       	</div>
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
			    showFlage:true,
			    rowData:"",
			    height:"",
			    msg:[
				 {content:'播放'},
				 {content:'编辑'},
				 {content:'替换'},
				 {content:"删除"},
				 {content:"搜索"},
				 {content:"批量搜索"}				 
				],
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
			    },{
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
			    },{
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
			    },{
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
			    },{
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
			    },{
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
			    },{
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
			    },{
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
			    },{
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
			    },{
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
			    },{
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
			    },{
			    	id:'001',
			    	singName:"稻香",
			    	singerName:'周杰伦',
			    	yuyan:'国语',
			    	movie:"原版MV",
			    	localtion:"大陆",
			    	geshi:"Mp4",
			    	soundbanben:"消音",
			    	qufeng:"影视金曲",
			    	zhujiName:"我想和你唱我想和你唱我想和你唱我想和你唱我想和你唱",
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
			newBox(){
				this.$Win.openWin({
		          width: 800,
		          height: 600,
		          minHeight:600,
		          minWidth:800,
		          data: {id: 1},
		          router: '/backGround'
		        })
			},
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      },
			playVideo(){
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
		     },
		     isScrollEnd() {
		     	
			  this.t2 = this.scroll.scrollTop;
			  if(this.t2 == this.t1){
			    this.propFlage = false
			  }
			},
			rightMeun(e){
				e.preventDefault();				
				var menu=document.querySelector(".rightBox");				
				menu.style.left=e.clientX - 200+'px';
				menu.style.top=e.clientY- document.querySelector("#scroll-1").offsetTop-80+'px';
				menu.style.width = 100 + 'px'
			},
			hoo(row,event){
				this.rowData = row
				console.log(this.rowData)
			}

		},
		mounted(){
			var _this = this
			this.height = "height:"+(document.body.clientHeight-180)+"px"
			window.onresize = function(){
				console.log(document.body.clientHeight)
				setTimeout(function(){
				_this.height = "height:"+(document.body.clientHeight-180)+"px"	
					console.log(_this.height)
				},200)
			}
            window.onclick = function(){
            	var menu=document.querySelector(".rightBox");
            	if(menu){
            		menu.style.width = 0 + "px"
            	}
            }
            window.oncontextmenu = function(){
               var menu=document.querySelector(".rightBox");
            	if(menu){
            		menu.style.width = 0 + "px"
            	}
            }
		}
	}
</script>
<style>
	#LibraryManagement {
		
		
	}
	ul,li{
		margin: 0;
		padding: 0;
	}
	li {
		list-style: none;
	}
	#LibraryManagement .soushuo .el-input__inner{
		width: 130px;
	}
	#LibraryManagement .el-button{
		font-size: 12px;
	}
	#LibraryManagement .cell{
		text-align: center;
	}
	.el-notification{
		width: 200px;
		
	}
	#LibraryManagement .lastBlock{
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    height: 50px;
	    background: white;	
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
	#LibraryManagement .rightBox{
		width: 0px;
		height: 140px;
		background: yellow;
		position: absolute;
		z-index: 20000;
		display: flex;
		overflow: hidden;
		box-shadow: 1px 1px 7px #a59e9e;
	}
   #LibraryManagement .rightBox ul{
   	width: 100%;
   	height: 100%;
   	background: #fff;
   	padding: 10px 0;
   	
   }
   #LibraryManagement .rightBox ul li{
   	width: 100%;
   	height: 30px;
   	line-height: 30px;
   	cursor: pointer;  	
   	
   }
    #LibraryManagement .rightBox ul li:hover{
    	background: #ececec;
    }
	#LibraryManagement .chaozhuo{
		font-size: 14px;
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
    	
    	
    	overflow: auto;
    	margin-right:5px ;
    	font-size: 12px;
    }
    .bb{
    	
    	
    	overflow: auto;
    	margin-right:5px ;
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