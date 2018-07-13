<template>
	<div id="SongsUploaded">
		 <div class="box" v-show="flage">
			 <i class="el-icon-document" style="font-size: 90px;color: #d5d5d5 ;"></i>
			 <i style="margin: 10px 0;">暂无导入的歌曲</i>
			 <span class="fileinput-button">
		        <el-button type="primary" style="width: 150px;" size="mini"><i style="padding: 0 20px;">导入</i></el-button>
				<input type="file" />
			 </span>
			 <i style="margin: 10px 0;">或将文件直接拖入框中</i>
		 </div> 
		 <div class="box1" v-show="!flage">
			 <el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column
				  type="selection"
				  width="55">
				</el-table-column>
				<el-table-column
				  label="编号"
				  min-width="60">
				  <template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column
				  prop="songName"
				  label="歌曲名称"
				  min-width="120">
				</el-table-column>
				<el-table-column
				  prop="songerName"
				  label="歌手名称"
				  min-width="100">
				</el-table-column>
				<el-table-column
				prop="yuyan"
				label="语言"
				min-width="60">
				</el-table-column>
				<el-table-column
				prop="humian"
				label="画面"
				min-width="60">
				</el-table-column>
				<el-table-column
				prop="diqu"
				label="地区"
				min-width="80">
				</el-table-column>
				<el-table-column
				prop="gesi"
				label="格式"
				min-width="60">
				</el-table-column>
				<el-table-column
				prop="banbeng"
				label="声音版本"
				min-width="60">
				</el-table-column>
				<el-table-column
				prop="qufeng"
				label="曲风"
				min-width="100">
				</el-table-column>
				<el-table-column
				prop="zhuanjiName"
				label="专辑名称"
				min-width="120">
				</el-table-column>
				<el-table-column
				prop="songeState"
				label="状态"
				min-width="60">
				</el-table-column>
				<el-table-column
				prop="address"
				label="操作"
				min-width="180">
				</el-table-column>
			  </el-table>
		 </div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				flage:false,
				  tableData: [{
				  "id":"001",
				  "songName":"小宝贝",
				  "songerName":"隔壁老王",
				  "yuyan":"日语",
				  "humian":"高清",
				  "diqu":"大陆",
				  "gesi":"MP4",
				  "banbeng":"消音",
				  "qufeng":"影视金曲",
				  "zhuanjiName":"老王卖瓜",
				  "songeState":"1"				  
				},{
				  "id":"001",
				  "songName":"小宝贝",
				  "songerName":"隔壁老王",
				  "yuyan":"日语",
				  "humian":"高清",
				  "diqu":"大陆",
				  "gesi":"MP4",
				  "banbeng":"消音",
				  "qufeng":"影视金曲",
				  "zhuanjiName":"老王卖瓜",
				  "songeState":"1"				  
				},{
				  "id":"001",
				  "songName":"小宝贝",
				  "songerName":"隔壁老王",
				  "yuyan":"日语",
				  "humian":"高清",
				  "diqu":"大陆",
				  "gesi":"MP4",
				  "banbeng":"消音",
				  "qufeng":"影视金曲",
				  "zhuanjiName":"老王卖瓜",
				  "songeState":"1"				  
				},{
				  "id":"001",
				  "songName":"小宝贝",
				  "songerName":"隔壁老王",
				  "yuyan":"日语",
				  "humian":"高清",
				  "diqu":"大陆",
				  "gesi":"MP4",
				  "banbeng":"消音",
				  "qufeng":"影视金曲",
				  "zhuanjiName":"老王卖瓜",
				  "songeState":"1"				  
				},],
				multipleSelection: []
			}
		},
		methods:{
			handleSelectionChange(val) {
				this.multipleSelection = val;
			  }
		},
		mounted(){
			var box = document.getElementById('SongsUploaded')
			var _this = this
					box.ondragover = function (ev) {
						//阻止浏览器默认打开文件的操作
						ev.preventDefault();	
						
				}
					box.ondrop = function(e){
						
					e.preventDefault();			    	
					var files = e.dataTransfer.files
					var type = files[0].type
// 					if(type == ""){
// 							_this.dropFolder(files,true)
// 						}else{
// 							_this.dropFolder(files,false)
// 						}						
// 					}
					console.log(files)
				}
					
		}
	}
</script>

<style scoped="scoped">
	#SongsUploaded i{
		font-style: normal;
		
	}
	#SongsUploaded{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-top:10px ;
		padding-left: 10px;
		background: #f3f3f3;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	#SongsUploaded .box{
		
		display: flex;
	
		flex-direction: column;
		align-items: center;
	}
	#SongsUploaded .box1{
		
		width: 100%;
		height: 100%;
	
		
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
</style>