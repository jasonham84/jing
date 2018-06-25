<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		 <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
		   <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>
		  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
		  <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
		  <el-breadcrumb-item :to='{path:item.route}' v-for='item in arr'>{{item.name}}</el-breadcrumb-item>
   </el-breadcrumb>
</template>
<script>
	export default{
		data(){
			return{
				arr:[]
			}
		},
		props:{
			
		},
		methods:{
			foo(str){
				var arr = str.split('/')
				  arr.shift()
				
				var arr1 = []				 				
				
				arr.map(function(item){
					var obj = {}
					switch(item){
						case 'LibraryManagement':
						  obj.name ="曲库管理"
						  obj.route = '/LibraryManagement'
						  break;
						case 'CustomManagement':
						  obj.name ="定制管理"
						  obj.route = '/CustomManagement'
						  break;
						case 'SongsUploaded':
						  obj.name ="歌曲上传"
						  obj.route = '/SongsUploaded'
						  break;
						case 'Uploading':
						  obj.name ="正在上传"
						  obj.route = '/Uploading'
						  break;
						case 'VideoPlayback':
						  obj.name ="视频播放"
						  obj.route = '/LibraryManagement/VideoPlayback'
						break;
					}
					arr1.push(obj)
				})
				
				this.arr = arr1
			}
		},
		watch: {
	        $route (newVal) {
	           var lists = this.$route.path.split('/')
	           var href = this.$route.path
	           
	            this.foo(href)
	          }
        },
        created: function () {
		        var lists = this.$route.path.split('/')
		        var href = this.$route.path
		        
		       this.foo(href)
        }
		
	}
</script>

<style>
</style>