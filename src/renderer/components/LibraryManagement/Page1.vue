<template>
	<div id="LibraryManagement">
		<el-dialog @close="beforeClose" title="批量搜索" :modal='false' top='26vh' :close-on-click-modal="false" custom-class="PLSOSU" :visible.sync="dialogVisible" width="401px">
			<span style="display: flex;background: #fbfbfb;box-sizing:border-box;height: 176px;border: 1px  dashed #fed347;border-radius: 5px;justify-content: center;align-items: center;">
		  	  <span v-if="!showUpload" style="display: block;width: 70%;">
		  	  	
		  	  	
		  <i class="el-icon-document" style="font-size: 50px;color: #96a0ba;"></i>
		  <div style="margin-top: 20px;">
		  	  <span style="display: flex;justify-content: space-between;margin: 0px 16px 0px 15px;align-items: center;" class="uploadFileName">
		  	  	<span class="fileName">
		  	  		<i class="el-icon-tickets" ></i>
		  	  	    <i style="font-style: normal;">{{fileName}}</i>
		  	  	</span>

			<i class="el-icon-close uploadFileClose" style="cursor: pointer;" @click="uploadClose"></i>
			</span>
			<span>
		  	  	<el-progress  :stroke-width="2"  :percentage="percentage" :status="percentageStatus"></el-progress>
		  	  </span>
	</div>
	</span>

	<el-upload ref="upload" v-show="showUpload" class="upload-demo" drag :on-progress="handleProgress" :on-success="handleSuccess" :on-error="handleError" :before-upload="handleUpload" action="https://jsonplaceholder.typicode.com/posts/" multiple>

		<i class="el-icon-upload"></i>
		<div class="el-upload__text" style="font-size: 12px;" v-show="TJerror">将文件拖到此处，或<em>点击上传</em></div>
		<div class="el-upload__text" style="font-size: 12px;color: red;" v-show="!TJerror">{{fileName}}上传失败，请重新上传</div>
	</el-upload>

	</span>
	<p style="margin: 0;padding: 0; text-align: left;margin-top: 20px;font-size: 12px;">请先上传模板文件已完成批量搜索
		<a style="color:#7f74ef;cursor: pointer;text-decoration: underline;">下载模板</a>
	</p>
	<span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
		    <el-button type="primary" @click="submitContent"  size="mini" v-show="!uploadBtn" :loading="submitContentLoading">提交</el-button>
		    <el-button    type="info" size="mini" :disabled="true" v-show="uploadBtn">提交</el-button>
		  </span>
	</el-dialog>

	<!--替换弹框-->
	<el-dialog title="替换文件" @close="replaceClose" :visible.sync="replaceVisible" width="401px" :modal='false' :close-on-click-modal="false" top='26vh' custom-class="PLSOSU">
		<span style="display: flex;box-sizing:border-box;height: 176px;border-radius: 5px;justify-content: center;align-items: center;">
		<span v-if="showUpload1" style="display: block;width: 70%;">
		  	  	
		  	  	
		 
		 <img src="../../assets/file.png" />
		 <div style="margin-top: 20px;">
		  	  <span style="display: flex;justify-content: space-between;margin: 0px 16px 0px 15px;align-items: center;" class="uploadFileName">
			  	  	<span class="fileName">
			  	  		<i class="el-icon-tickets" ></i>
			  	  	    <i style="font-style: normal;display: inline-block;width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{replacefileName}}</i>
			  	  	</span>

			       <i class="el-icon-close uploadFileClose" style="cursor: pointer;" @click="replaceClose"></i>
			</span>
			<span>
		  	  	<el-progress  :stroke-width="2"  :percentage="replacePercentage" :status="replacePercentageStatus"></el-progress>
		  	</span>
	    </div>
	   </span>


		<el-upload 
			ref="replaceUpload"
			class="upload-demo"
			:before-upload="replaceBeforeUpload"
			:on-success="replaceSuccess"
			:on-error="replaceError"
			:on-progress="replaceProgress"
			action="https://jsonplaceholder.typicode.com/posts/"   
			v-show="!showUpload1"
			
			>
			<el-button size="mini" plain><i class="el-icon-upload el-icon--right"></i>上传文件</el-button>
			<div slot="tip" class="el-upload__tip" v-show="!replaceUploadError">请先上传文件已完成替换</div>
			<div slot="tip" class="el-upload__tip" v-show="replaceUploadError" style="color: red;">"文件名"上传失败，请从新上传</div>
		</el-upload>

		</span>

		<span slot="footer" class="dialog-footer">
		    <el-button @click="replaceVisible = false" size="mini">取 消</el-button>
		    <el-button type="primary" size="mini" v-show="!replaceBtn" @click="replaceFileBtn" :loading="replaceFileBtnStatus">替换</el-button>		    
		    <el-button type="info" size="mini" :disabled="true" v-show="replaceBtn">替换</el-button>		    
		  </span>
	</el-dialog>
    
   <!--单个删除弹框-->
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
	
	
	<div class="soushuo">
		<el-row>
			<el-col :span="20" style="height: 50px;display: flex;align-items: center;font-size: 12px;">
				<el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" size="mini">
					<el-form-item label="歌曲名称">
						<!--<el-input v-model="formInline.songName" placeholder="请输入"></el-input>-->
						 <el-autocomplete
				      class="inline-input"
				      v-model="formInline.songName"
				      :fetch-suggestions="querySearch"
				      placeholder="请输入内容"
				      @select="handleSelect"
				    ></el-autocomplete>
					</el-form-item>
					<el-form-item label="歌手名称">
						<!--<el-input v-model="formInline.songerName" placeholder="请输入"></el-input>-->
						 <el-autocomplete
				      class="inline-input"
				      v-model="formInline.songerName"
				      :fetch-suggestions="querySearch"
				      placeholder="请输入内容"
				      @select="handleSelect"
				    ></el-autocomplete>
					</el-form-item>
					<el-form-item label="专辑名称">
						<!--<el-select v-model="formInline.albumName" placeholder="请选择">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>-->
							 <el-autocomplete
				      class="inline-input"
				      v-model="formInline.albumName"
				      :fetch-suggestions="querySearch"
				      placeholder="请输入内容"
				      @select="handleSelect"
				    ></el-autocomplete>
					</el-form-item>
					<el-form-item label="唱片公司">
						<!--<el-input v-model="formInline.recordCompany" placeholder="请输入"></el-input>-->
						<!--<el-select v-model="formInline.recordCompany" placeholder="请选择">
							<el-option label="q" value="11"></el-option>
							<el-option label="q" value="1"></el-option>
						</el-select>-->
							 <el-autocomplete
				      class="inline-input"
				      v-model="formInline.recordCompany"
				      :fetch-suggestions="querySearch"
				      placeholder="请输入内容"
				      @select="handleSelect"
				    ></el-autocomplete>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="1" style="height: 50px;display: flex;align-items: center;margin-right: 20px;">
				<el-button type="primary" size="mini" @click="onSubmit" v-tishi:30="msg[4].content">搜索</el-button>
			</el-col>
			<el-col :span="2" style="height: 50px;display: flex;align-items: center;">
				<el-button size="mini" @click="dialogVisible = true" v-tishi:60="msg[5].content">批量搜索</el-button>
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
		<transition name="slide-fade" v-on:before-enter="beforeEnter" v-on:after-leave="afterLeave">
			<el-row v-show="flage">
				<el-col :span="16" style="height: 50px;display: flex;align-items: center;">
					<el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" size="mini">
						<el-form-item label="专辑名称">
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
			<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark"  @selection-change="handleSelectionChange" @row-contextmenu="hoo" style="width: 100%;font-size: 12px;color: #666666;">
				<el-table-column type="selection" min-width="55" >
				</el-table-column>
				<el-table-column prop="id" label="编号" min-width="50">

				</el-table-column>
				<el-table-column prop="singName" label="歌曲名称" min-width="70">
				</el-table-column>
				<el-table-column prop="singerName" label="歌手名称" min-width="80">
				</el-table-column>

				<el-table-column prop="yuyan" label="语言" min-width="60">
				</el-table-column>
				<el-table-column prop="movie" label="画面" min-width="80">
				</el-table-column>
				<el-table-column prop="localtion" label="地区" min-width="60">
				</el-table-column>
				<el-table-column prop="geshi" label="格式" min-width="60">
				</el-table-column>
				<el-table-column prop="soundbanben" label="声音版本" min-width="80">
				</el-table-column>
				<el-table-column prop="qufeng" label="曲风" min-width="80">
				</el-table-column>
				<el-table-column prop="zhujiName" label="专辑名称" min-width="80">
				</el-table-column>
				<el-table-column prop="yuanchang" label="原唱" min-width="60">
				</el-table-column>
				<el-table-column prop="banchang" label="绊唱" min-width="50">
				</el-table-column>
				<el-table-column prop="shangDate" label="上传日期" min-width="80">
					<!--<template slot-scope="scope">
	        <el-popover trigger="hover" placement="top">
	          <p>日期：{{ scope.row.shangDate }}</p>	          
	          <div slot="reference" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
	            <p size="mini">{{ scope.row.shangDate }}</p>
	          </div>
	        </el-popover>
	       </template>-->
				</el-table-column>
				<el-table-column label="操作" min-width="162">
					<template slot-scope="scope">
						<i class="iconfont icon-bofang" style="font-size: 20px;cursor: pointer;margin: 0 5px;" v-tishi:30="msg[0].content" @click="play(scope.row.id)"></i>
						<i class="iconfont icon-bianji" style="font-size: 20px;cursor: pointer;margin: 0 5px;" v-tishi:30="msg[1].content" @click="JumpPage(scope.row.id)"></i>
						<i class="iconfont icon-dianliangqiang_daohang_tihuan_moren" style="font-size: 20px;cursor: pointer;margin: 0 5px;" v-tishi:30="msg[2].content" @click="replaceFile(scope.row.id)"></i>
						<i class="iconfont icon-shanchu" style="font-size: 20px;cursor: pointer;margin: 0 5px;" v-tishi:30="msg[3].content" @click="deleteFile(scope.row.id)"></i>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
	<div style="height: 67vh;background: white;width: 100%;position: absolute;left: 0;top: 100px;display: flex;justify-content: center;align-items: center;z-index: 30;" v-show="loading">
		<Loading/>
	</div>
	<div style="height: 50px;width:100%;position: absolute;bottom: 0;right: 0;padding: 0 20px;box-sizing: border-box;border-top: 1px solid gainsboro;">
		<div class="block lastBlock">
			<span class="demonstration" style="color: #999999;">已加载200条数据</span>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="4000">
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
	const {
		ipcRenderer
	} = require('electron')
	import Loading from '../CustomComponents/Loading';
	import Bus from '../bus.js'
	import axios from 'axios'
	export default {
		components: {
			Loading
		},
		data() {
			return {
				formInline: {
					songName: '',
					songerName: '',
					albumName: "",
					recordCompany: ""
				},
				dialogVisible: false, //批量上传模特框		    
				flage: false, //
				flageClass: false, //控制滚动条
				showFlage: true, //
				showUpload: true, //切换批量上传模特框的
				uploaderror: false, //上传文件出错是调用
				percentage: 0, //上传文件的进度条
				uploadBtn: true, //改变提价按键状态
				loading: false, //table加载状态
				TJerror: true, //搜索失败显示
				fileName: "", //当前上传文件的名字
				templateFile: "", //最终的模板文件	
				submitContentLoading: false, //提交按钮的loading图标
				showUpload1:false,
				replaceVisible: false,
				replacefileName:"稻香--周杰伦",
				replacePercentage:0,
				replaceTemplateFile:"",
				replaceBtn:true,
				replaceUploadError:false,
				replaceStatus:false,
				replaceFileBtnStatus:false,
				delecteVisible:false,
				deldecteFileID:"",
				delecteLoading:false,
				delectesLoading:false,
				multipleSelection :[],
				delectesVisible:false,
				restaurants:[],
				rowData: "",
				height: "",
				msg: [{
						content: '播放'
					},
					{
						content: '编辑'
					},
					{
						content: '替换'
					},
					{
						content: "删除"
					},
					{
						content: "搜索"
					},
					{
						content: "批量搜索"
					}
				],
				tableData3: [],
				multipleSelection: [],
				videoData: []
			}

		},
		computed: {
			percentageStatus: function() {
				if(!this.uploaderror) {
					if(this.percentage == 100) {
						return 'success'
					} else {
						return ""
					}
				} else {

					return "exception"

				}

			},
		    replacePercentageStatus:function() {
				if(!this.replaceUploadError) {
					if(this.replacePercentage == 100&&this.replaceStatus) {
						return 'success'
					} else {
						return ""
					}
				} else {

					return "exception"

				}

			}
		},
		methods: {

			//上传调用函数
			beforeClose() {
				this.showUpload = true
				this.uploaderror = false
				this.percentage = 0
				this.uploadBtn = true
				this.loading = false
				this.TJerror = true
				this.fileName = ""
				this.templateFile = ""
				this.loading = false
			},
			submitContent() {
				this.submitContentLoading = true
				var _this = this
				var num = 0

				setTimeout(function() {
					if(num == 1) {
						_this.submitContentLoading = false
						_this.dialogVisible = false
						_this.tableData3 = []
						_this.loading = true
					} else {
						_this.$notify({							
							message: '提交失败，请重试',
							type: 'warning',
				            offset: 120,
 				            duration:2000,
						});
						_this.TJerror = false
						_this.showUpload = true
						_this.uploadBtn = true
						_this.submitContentLoading = false

					}

				}, 2000)

			},
			handleError() {
				this.uploaderror = true
			},
			handleProgress(event, file, fileList) {
				var percentage = event.percent
				this.percentage = parseInt(percentage)

			},
			handleSuccess(response, file, fileList) {
				//				console.log(response, file, fileList)
				console.log(fileList)
				this.templateFile = fileList[0]
				this.uploadBtn = false
			},
			handleUpload(file) {
				this.fileName = file.name
				this.showUpload = false
				this.percentage = 0
			},
			uploadClose() {
				this.$refs.upload.abort()
				console.log(this.$refs.upload.fileList)
				var fileList = this.$refs.upload.fileList
				this.$refs.upload.clearFiles()
				this.templateFile = ""
				this.showUpload = true
				this.uploaderror = false
				this.uploadBtn = true
				this.TJerror = true
			},

			//编辑跳转页面
			JumpPage() {
				this.$router.push("/editPage")
			},
			
			
			
           //替换文件
			replaceFile(id) {
				this.replaceVisible = true

			},
			replaceBeforeUpload(file){
				this.replacefileName = file.name
				this.showUpload1 = true
				this.replaceUploadError = false
            	this.replaceTemplateFile = ""
            	this.replaceBtn = true
            	this.replacePercentage = 0
            	this.replaceStatus = false
				
			},
            replaceProgress(event, file, fileList){
            	var percentage = event.percent
				this.replacePercentage = parseInt(percentage)
            },
            replaceSuccess(response, file, fileList){
            	this.replaceTemplateFile = fileList[0]
            	this.replaceBtn = false
            	this.replaceStatus = true
            },
            replaceError(err, file, fileList){
            	this.replaceUploadError = true
            	this.showUpload1 = false
            },
            replaceClose(){
            	this.$refs.replaceUpload.abort()
            	this.$refs.replaceUpload.clearFiles()
            	this.showUpload1 = false
            	this.replaceUploadError = false
            	this.replaceTemplateFile = ""
            	this.replaceBtn = true
            	this.replacePercentage = 0
            	this.replaceStatus = false
            },
            replaceFileBtn(){
            	this.replaceFileBtnStatus = true
            	var _this = this
            	var num = parseInt(10*Math.random())%2
            	setTimeout(function(){
            		_this.replaceFileBtnStatus = false
            		if(num == 1){
              		 _this.$notify({				          
				          message: '替换成功',
				          type: 'success',
				          offset: 120,
				          duration:2000,				          
				        });
				    _this.replaceVisible = false
            		}else{
            		_this.$notify({				          
				          message: '替换失败，请重试',
				          type: 'warning',
				          offset: 120,
 				          duration:2000,
				        });	            			
            		}
  
            	},1000)
            },
            
            
         //  单个删除文件         
            
            deleteFile(id){
           this.deldecteFileID = id
           this.delecteVisible = true

            },
            
            delecteBtn(){
            var arr = this.tableData3
            var ID = this.deldecteFileID
            var _this = this
            this.delecteLoading = true                                
            setTimeout(function(){           	
                arr.map(function(item,index){
                	if(item.id == ID){
                		arr.splice(index,1)
                	}
                }) 
            	_this.delecteLoading = false
            	_this.delecteVisible = false
            	_this.$notify({				          
				          message: '删除成功！',
				          type: 'success',
				          offset: 120,
 				          duration:2000,
				        });	
               },1000)
            },
            //批量删除文件
            delectesBtn(){
				var _this = this
				var arr = this.tableData3
				var arr1 = this.multipleSelection
				this.delectesLoading = true
				setTimeout(function(){
					for(var i = 0 ; i<arr1.length; i++){
					var id = arr1[i].id
					arr.map(function(item,index){
						if(item.id == id){
							arr.splice(index,1)
							return
						}
					})
				}
					_this.delectesLoading = false
					_this.delectesVisible = false
            	    _this.$notify({				          
				          message: '删除成功！',
				          type: 'success',
				          offset: 120,
 				          duration:2000,
				        });	
				},1000)
							
			},
            //表单的模糊查询
            querySearch(queryString, callback) {
		        var restaurants = this.restaurants;
		        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
		        // 调用 callback 返回建议列表的数据
		        callback(results);
		      },
           createFilter(queryString) {
             return (restaurant) => {
             return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
		        };
		      },
            handleSelect(item){
            	 console.log(item);
            },
            
            
            
            
            
			play(id) {
				this.changeData(id)
				ipcRenderer.send('childWindow')

			},
			newBox() {
				console.log(this.rowData.id, "ppp")

				this.changeData(this.rowData.id)
				ipcRenderer.send('childWindow')

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
                console.log(val)
                if(this.multipleSelection.length>0){
                	Bus.$emit('val', "1")
                }else{
                	Bus.$emit('val', "0")
                }
           },
			handleSizeChange(val) {
				var _this = this
				console.log(`每页 ${val} 条`);
				this.tableData3 = []
				this.loading = true
				setTimeout(function(){
				
				_this.detail()
				},2000)
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				var _this = this				
				this.tableData3 = []
				this.loading = true
				setTimeout(function(){
				
				_this.detail()
				},2000)
			},
			playVideo() {
				this.$router.push('/LibraryManagement/VideoPlayback')
			},
			zhanKai() {
				this.flage = !this.flage
			},
			onSubmitPL() { //批量搜索

			},
			onSubmit() {
				console.log('submit!');
			},
			open2() {
				this.$notify({
					message: '这是一闭的消息',
					type: 'success',
					duration: 0,
					offset: 60
				});
			},
			afterLeave() {
				this.flageClass = !this.flageClass
			},
			beforeEnter() {
				this.flageClass = !this.flageClass
			},
			isScrollEnd() {

				this.t2 = this.scroll.scrollTop;
				if(this.t2 == this.t1) {
					this.propFlage = false
				}
			},
			rightMeun(e) {
				e.preventDefault();
				var menu = document.querySelector(".rightBox");
				menu.style.left = e.clientX - 200 + 'px';
				menu.style.top = e.clientY - document.querySelector("#scroll-1").offsetTop - 80 + 'px';
				menu.style.width = 100 + 'px'
			},
			hoo(row, event) {
				this.rowData = row
				console.log(this.rowData)
			},
			changeData(id) {
				var arr = this.tableData3;
				var arr1 = []
				var obj1 = {}
				var num;
				arr.map(function(item, index) {
					var obj = {}
					if(item.id == id) {
						num = index
					}
					obj.id = item.id;
					obj.name = item.singName + "--" + item.singerName;
					obj.http = item.http;
					arr1.push(obj)
				})
				obj1.currentID = num;
				obj1.content = arr1;
				obj1.id = arr[0].id
				console.log(obj1)
				localStorage.setItem('videoPlayList', JSON.stringify(obj1))
			},
			detail(){		
				var _this = this
				this.loading = true
				axios.get('http://localhost:8888/data').then(function(response){
					_this.loading = false
					_this.tableData3 = response.data
					console.log(response.data);//请求正确时执行的代码
					
				}).catch(function (response){
					console.log(response);//发生错误时执行的代码
				})
			},
			loadAll(){
				var _this = this
				axios.get('http://localhost:8888/data1').then(function(response){
					
					_this.restaurants = response.data
					console.log(response.data);//请求正确时执行的代码
					
				}).catch(function (response){
					console.log(response);//发生错误时执行的代码
				})
			}

		},
		mounted() {
			var _this = this

			this.height = "height:" + (document.body.clientHeight - 180) + "px"
			this.detail()
			this.loadAll()
			window.onresize = function() {
				console.log(document.body.clientHeight)
				setTimeout(function() {
					_this.height = "height:" + (document.body.clientHeight - 180) + "px"
					console.log(_this.height)
				}, 200)
			}
			window.onclick = function() {
				var menu = document.querySelector(".rightBox");
				if(menu) {
					menu.style.width = 0 + "px"
				}
			}
			window.oncontextmenu = function() {
				var menu = document.querySelector(".rightBox");
				if(menu) {
					menu.style.width = 0 + "px"
				}
			}
			
			Bus.$on("delected",function(){
				_this.delectesVisible = true				
			})
			
			Bus.$on("exportFile",function(){				
				console.log(_this.multipleSelection)
			})
       
		}
	}
</script>
<style>
	.el-notification{
		display: flex;
		align-items: center;
	}
	.el-notification .el-notification__content{
		margin: 0;
		font-size: 14px;
	}
	#LibraryManagement {}
	
	ul,
	li {
		margin: 0;
		padding: 0;
	}
	
	li {
		list-style: none;
	}
	
	#LibraryManagement .soushuo .el-input__inner {
		width: 130px;
	}
	
	#LibraryManagement .el-button {
		font-size: 12px;
	}
	
	#LibraryManagement .cell {
		text-align: center;
	}
	
	#LibraryManagement .el-upload-list {
		display: none;
	}
	
	.el-notification {
		width: 200px;
		border-radius: 5px;
		box-shadow: -1px 2px 18px 7px rgba(0,0,0,.3);
	}
	
	#LibraryManagement .PLSOSU {
		border: none;
	}
	
	#LibraryManagement .PLSOSU .el-dialog__header {
		padding: 6px 10px;
		text-align: left;
		border-bottom: 1px solid #efeded;
	}
	
	#LibraryManagement .PLSOSU .el-dialog__header .el-dialog__title {
		font-size: 12px;
		color: #666666;
	}
	
	#LibraryManagement .PLSOSU .el-dialog__body {
		padding: 30px 20px 10px 20px;
	}
	
	#LibraryManagement .PLSOSU .el-dialog__header .el-dialog__headerbtn {
		top: 10px;
		right: 10px;
	}
	
	#LibraryManagement .PLSOSU .el-dialog__body .el-upload-dragger {
		border: none;
		background-color: rgba(255, 255, 255, 0);
		font-size: 12px;
	}
	#LibraryManagement .PLSOSU .el-dialog__footer{
		border-top: 1px solid #efeded;
	}
	#LibraryManagement .PLSOSU .uploadFileName:hover{
		background: #e6e6e0;
	}
	#LibraryManagement .PLSOSU .uploadFileClose:hover{
		color: #409eff;
	}
	#LibraryManagement .DELECT .el-dialog__header .el-dialog__title{
		font-size: 16px;
	}
	#LibraryManagement .DELECT .el-dialog__header{
		display: flex;
		align-items: center;		
	}
	#LibraryManagement .DELECT .el-dialog__body{
		text-align: left;
		
	}
	#LibraryManagement .lastBlock {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		background: white;
	}
</style>
<style scoped="scoped">
	#LibraryManagement {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
	}
	
	#LibraryManagement .rightBox {
		width: 0px;
		height: 140px;
		background: yellow;
		position: absolute;
		z-index: 20000;
		display: flex;
		overflow: hidden;
		box-shadow: 1px 1px 7px #a59e9e;
	}
	
	#LibraryManagement .rightBox ul {
		width: 100%;
		height: 100%;
		background: #fff;
		padding: 10px 0;
	}
	
	#LibraryManagement .rightBox ul li {
		width: 100%;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
	}
	
	#LibraryManagement .rightBox ul li:hover {
		background: #ececec;
	}
	
	#LibraryManagement .chaozhuo {
		font-size: 14px;
	}
	
	#LibraryManagement .demo-form-inline {
		height: 30px;
	}
	
	#LibraryManagement .soushuo {
		border-bottom: 1px solid #ebebeb;
	}
	
	.fileName {
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	
	.fileName:hover {
		color: #409eff;
	}
	
	.slide-fade-enter-active {
		transition: all .5s ease;
	}
	
	.slide-fade-leave-active {
		transition: all .5s ease;
	}
	
	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateY(-10px);
		opacity: 0;
	}
	
	.aa {
		overflow: auto;
		margin-right: 5px;
		font-size: 12px;
	}
	
	.bb {
		overflow: auto;
		margin-right: 5px;
		font-size: 12px;
	}
	
	#scroll-1::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #f0f0f0;
	}
	
	#scroll-1::-webkit-scrollbar {
		width: 10px;
		background-color: #f0f0f0;
	}
	
	#scroll-1::-webkit-scrollbar-thumb {
		border-radius: 20px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: #cfd1d3;
	}
	
	#scroll-1::-webkit-scrollbar-thumb:hover {
		background-color: #a7acb1;
	}
	
	#scroll-1::-webkit-scrollbar-thumb:active {
		background-color: #9da2a7;
	}
</style>