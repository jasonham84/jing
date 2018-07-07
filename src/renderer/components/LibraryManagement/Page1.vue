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
    
	<div class="soushuo">
		<el-row>
			<el-col :span="20" style="height: 50px;display: flex;align-items: center;font-size: 12px;">
				<el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" size="mini">
					<el-form-item label="歌曲名称">
						<el-input v-model="formInline.songName" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="歌手名称">
						<el-input v-model="formInline.songerName" placeholder="请输入"></el-input>
					</el-form-item>
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
			<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" @row-contextmenu="hoo" style="width: 100%;font-size: 12px;color: #666666;">
				<el-table-column type="selection" min-width="55">
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
				tableData3: [{
						id: '001',
						singName: "伤情",
						singerName: '吉克隽逸',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://221.228.226.15/13/h/j/x/o/hjxoorqntjapgioycqdqwivmtlkcwf/hd.yinyuetai.com/30B001630A6A9C1365CFA757556226F8.mp4?sc=ed447b74660550dd"
					}, {
						id: '002',
						singName: "爱难脱身",
						singerName: '陈坤',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://220.170.49.104/13/y/d/n/e/ydneivsxieianwkqsfpeaxbprsjgcg/hd.yinyuetai.com/16F20163ECC5F81C9367B527EF1BC0C3.mp4?sc=df6b447bd6298560",

					}, {
						id: '003',
						singName: "女儿国",
						singerName: '李荣浩  张倩影',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://113.105.248.47/2/g/o/a/g/goagwgdpujetwdrwivlemsucoprfvi/hd.yinyuetai.com/11EB016029869026BAD14572BE04FE5C.mp4?sc=77ddd3cf2d7d63e2",

					},
					{
						id: '004',
						singName: "爱如有",
						singerName: '邓紫棋',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://183.60.197.29/14/v/s/o/e/vsoefoytafultnuvxfwlkrmenthhtq/hd.yinyuetai.com/6026016444322A7E967FAD9273213C77.mp4?sc=d0109807442b6e58",

					}, {
						id: '005',
						singName: "就算",
						singerName: '张倩影',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://112.253.22.165/29/x/m/k/p/xmkpmfvwbzazivbbtmbqotqnubzoyk/hd.yinyuetai.com/9FA30163B9591D6D764E93C2E8BB59F7.mp4?sc=455a8b3071224186",

					}, {
						id: '006',
						singName: "Last Loue",
						singerName: 'Rihwa',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://221.228.226.17/8/i/q/m/i/iqmiplatftgbphqwprnatkwbfkmlsn/hc.yinyuetai.com/09AA013EB54C0C779AFE05BE8569D2C4.flv?sc=9197b2be34fb9caf&br=778&vid=665677&aid=24680&area=JP&vst=3",

					}, {
						id: '007',
						singName: "名侦探柯南",
						singerName: '不详',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://183.60.197.32/1/j/z/c/s/jzcsjzyjpoyklskuvogehqlixdwzcr/hc.yinyuetai.com/7FF90154AF443F70EE5C5601F7E0CC40.flv?sc=de61c19ae1d95118",

					}, {
						id: '008',
						singName: "Your Name",
						singerName: '无',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://221.228.226.18/11/y/w/o/s/ywoswlbdyvidclrvagebrxryjarbes/hd.yinyuetai.com/041301518B0F57187F54DDB9662920A1.flv?sc=58e2928eb8199eec",

					}, {
						id: '009',
						singName: "复仇者联盟3",
						singerName: '无',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://221.228.226.18/15/w/u/h/l/wuhlluoxtnyndowkjtdhngfatrqqyy/hd.yinyuetai.com/BEC901600BDD53646A51810F7455D05D.mp4?sc=28a7e33a801fdae8",

					}, {
						id: '010',
						singName: "无",
						singerName: '无',
						yuyan: '韩语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://221.228.226.23/14/t/r/a/t/trathvesenklkzwadbkuyzvbxowxbq/hd.yinyuetai.com/B63001614131B09BEBE7174F7363F96F.mp4?sc=8bd0d4a3854b24d0",

					}, {
						id: '011',
						singName: "舞曲",
						singerName: '无',
						yuyan: '国语',
						movie: "原版MV",
						localtion: "大陆",
						geshi: "Mp4",
						soundbanben: "消音",
						qufeng: "影视金曲",
						zhujiName: "我想和你唱",
						company: "滚石纸片公司",
						yuanchang: "1",
						banchang: "2",
						shangDate: "2016-09-21 08:50:08",
						chaozhuo: "操作",
						http: "http://183.60.197.32/7/a/n/c/c/anccjutvfiwumvvdmtofbcfobazfvr/hd.yinyuetai.com/6AE7015827D218E93729EFF12BF5347B.flv?sc=ea73200e91bab4d4"

					}
				],
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
            
            
         //  删除文件         
            
            deleteFile(id){
        	 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$notify({				          
				          message: '删除成功',
				          type: 'success',
				          offset: 120,
   				          duration:0,
				        });	   
		        }).catch(() => {
		          this.$notify({				          
				          message: '删除失败',
				          type: 'warning',
				          offset: 120,
   				          duration:2000,
				        });	            
		        });

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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
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
			}

		},
		mounted() {
			var _this = this

			this.height = "height:" + (document.body.clientHeight - 180) + "px"
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