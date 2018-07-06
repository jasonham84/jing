<template>
	<div id="editPage">
		<el-row style="width: 1120px;">
			<el-col >
				<h1 style="color: #666666;margin-left: 20px;">歌曲信息</h1>
			</el-col>
		 <el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline" size="mini" status-icon :rules="rules" ref="formInline">
		    <el-col :span="20" :offset="1" style="display: flex;justify-content: space-around;" >
		          <el-form-item label="歌曲名称" prop="songName">
				    <el-input v-model="formInline.songName" placeholder="请输入"></el-input>
				  </el-form-item>
				   <el-form-item label="歌手名称" prop="singerName">
				    <el-input v-model="formInline.singerName" placeholder="请输入"></el-input>
				  </el-form-item>
				   <el-form-item label="语言" prop="language">				   
				        <el-select v-model="formInline.language" placeholder="请选择">
					      <el-option label="国语" value="shanghai"></el-option>
					      <el-option label="韩语" value="beijing1"></el-option>
					      <el-option label="英语" value="beijing2"></el-option>
					      <el-option label="日语" value="beijing3"></el-option>
					    </el-select>
				  </el-form-item>
		    </el-col>
		    <el-col :span="20" :offset="1" style="display: flex;justify-content: space-around;">
		    	<el-form-item label="专辑名称" prop="albumName">				   
				    <el-autocomplete
				      class="inline-input"
				      v-model="formInline.albumName"
				      :fetch-suggestions="querySearch"
				      placeholder="请输入内容"
				      @select="handleSelect"
				    ></el-autocomplete>
				  </el-form-item>
				   <el-form-item label="唱片公司" prop="recordCompany">				    
				     <el-autocomplete
				      class="inline-input"
				      v-model="formInline.recordCompany"
				      :fetch-suggestions="querySearch"
				      placeholder="请输入内容"
				      @select="handleSelect"
				    ></el-autocomplete>
				  </el-form-item>
				   <el-form-item label="曲风" prop="genre">				   
				     <el-select v-model="formInline.genre" placeholder="请选择">
					      <el-option label="摇滚乐" value="shanghai"></el-option>
					      <el-option label="古典音乐" value="beijing1"></el-option>
					      <el-option label="爵士" value="beijing2"></el-option>
					      <el-option label="电音" value="beijing3"></el-option>
					    </el-select>
				  </el-form-item>
		    </el-col>
		 
		    <el-col :span="22" :offset="1">
		    	<i style="display: block;width: 100%;height: 1px;border-top: 1px solid #efeded;margin: 20px 0;"></i>
		    </el-col>
		    <el-col >
				<h1 style="color: #666666;margin-left: 20px;">文件信息</h1>
			</el-col>
			<el-col :span="19" :offset="1" style='display: flex;justify-content: space-between;margin-bottom: 30px;'>
				<div>
				<h3 style="color: #666666;">画面</h3> 
				  <el-radio-group v-model="formInline.videoframe" style="margin-left: 20px;">
				    <el-radio :label="3"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">原版MV</i></el-radio>
				    <el-radio :label="6"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">live演唱会</i></el-radio>
				    <el-radio :label="9"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">舞曲</i></el-radio>
				    <el-radio :label="10"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">配置画面</i></el-radio>
				  </el-radio-group>					
				</div>
				 <div>
				<h3 style="color: #666666;">原唱校验</h3> 
				  <el-radio-group v-model="formInline.originalSinging" style="margin-left: 20px;">
				    <el-radio :label="3"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">第1轨道</i></el-radio>
				    <el-radio :label="6"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">第2轨道</i></el-radio>
				    <el-radio :label="9"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">左声道</i></el-radio>
				    <el-radio :label="10"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">右声道</i></el-radio>
				  </el-radio-group>					
				</div> 
			</el-col>
				<el-col :span="19" :offset="1" style='display: flex;justify-content: space-between;margin-bottom: 30px;'>
				<div>
				<h3 style="color: #666666;">声音版本</h3> 
				  <el-radio-group v-model="formInline.soundVersion" style="margin-left: 20px;">
				    <el-radio :label="3" ><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">消音版本</i></el-radio>
				    <el-radio :label="6" ><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">原版伴奏</i></el-radio>
				    <el-radio :label="9" ><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">演唱会</i></el-radio>
				    <el-radio :label="10" ><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">remix</i></el-radio>
				  </el-radio-group>					
				</div>
				 <div>
				<h3 style="color: #666666;">伴唱校验</h3> 
				  <el-radio-group v-model="formInline.Accompaniment" style="margin-left: 20px;">
				    <el-radio :label="3"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">第1轨道</i></el-radio>
				    <el-radio :label="6"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">第2轨道</i></el-radio>
				    <el-radio :label="9"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">左声道</i></el-radio>
				    <el-radio :label="10"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">右声道</i></el-radio>
				  </el-radio-group>					
				</div> 
			</el-col>
			<el-col :span="19" :offset="1" style='display: flex;justify-content: space-between;margin-bottom: 30px;'>
				<div>
				<h3 style="color: #666666;">格式</h3> 
				  <el-radio-group v-model="formInline.format" style="margin-left: 20px;">
				    <el-radio :label="3"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">MP4</i></el-radio>
				    <el-radio :label="6"><i style="display: inline-block;width: 50px;font-style: normal;color: #666666;">MPG</i></el-radio>				    
				  </el-radio-group>					
				</div>				
			</el-col>	
			 <el-col :span="22" :offset="1">
		    	<i style="display: block;width: 100%;height: 1px;border-top: 1px solid #efeded;margin: 20px 0;"></i>
		    </el-col>
			 <el-col :span="22" :offset="1">
		    	<el-button size="mini" @click="resetForm('formInline')">重置</el-button><el-button type="primary" size="mini" @click="submitForm('formInline')">保存</el-button>
		    </el-col>
		</el-form>    
		</el-row>
	</div>
</template>

<script>
	export default{
		data(){
		var validateSongName = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请填写歌名'));
	        } else {	          
	          callback();
	        }
	      };
	    var validateSingerName = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('歌手名不能为空'));
	        } else {	          
	          callback();
	        }
	      };
	    var validateLanguage = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请选择语言'));
	        } else {	          
	          callback();
	        }
	      };
	    var validateAlbumName = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请填写专辑名称'));
	        } else {	          
	          callback();
	        }
	      };
	    var validateRecordCompany = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请填写唱片公司'));
	        } else {	          
	          callback();
	        }
	      };
	    var validateGenre = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请选择曲风'));
	        } else {	          
	          callback();
	        }
	      };
			return{
				formInline:{
					songName:"",
					singerName:"",
					language:"",
					albumName:"",
					recordCompany:"",
					genre:"",
					videoframe:3,
					originalSinging:3,
					soundVersion:3,
					Accompaniment:3,
					format:3
					
				},
				restaurants: [],
				rules:{
					songName: [
            			{ validator: validateSongName, trigger: 'blur' }
          				],
          			singerName: [
            			{ validator: validateSingerName, trigger: 'blur' }
          				],
          			language: [
            			{ validator: validateLanguage, trigger: 'change' }
          				],
          			albumName: [
            			{ validator: validateAlbumName, trigger: 'change' }
          				],
          			recordCompany: [
            			{ validator: validateRecordCompany, trigger: 'change' }
          				],
          			genre: [
            			{ validator: validateGenre, trigger: 'change' }
          				]
				},
				labelPosition:'top',
				radio2: 3
			}
		},
		methods:{
	    submitForm(formName){
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            console.log(this.formInline)
		          } 
		        })
		     },		      
	    resetForm(formName) {
		        this.$refs[formName].resetFields();
		      },
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
		loadAll(){
	        return [
	          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
	          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
	          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
	          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
	          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
	          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
	          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
	          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
	          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
	          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
	          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
	          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
	          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
	          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
	          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
	          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
	          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
	          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
	          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
	          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
	          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
	          { "value": "钱记", "address": "上海市长宁区天山西路" },
	          { "value": "壹杯加", "address": "上海市长宁区通协路" },
	          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
	          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
	          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
	          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
	          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
	          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
	          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
	          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
	          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
	          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
	          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
	          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
	          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
	          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
	          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
	          { "value": "浏阳蒸菜", "address": "天山西路430号" },
	          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
	          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
	          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
	          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
	          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
	          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
	          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
	          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
	          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
	        ];
           },
       handleSelect(item) {
        console.log(item);
        }
	  },
	  mounted(){
	      this.restaurants = this.loadAll();
	    }
	}
</script>

<style>
	#editPage{
		
		
		text-align: left;
	}
	#editPage .el-form-item__label{
		
		color: #333333;
	}
	#editPage .el-form-item__content{
		width: 250px;
	}
	#editPage .el-select--mini{
		width: 250px;
	}
	#editPage .el-autocomplete{
		width: 250px;
	}
	.el-select-dropdown__list .el-select-dropdown__item{
		font-size: 12px;
	}
	.el-autocomplete-suggestion .el-autocomplete-suggestion__wrap .el-autocomplete-suggestion__list  li{
		font-size: 12px;
	}
</style>