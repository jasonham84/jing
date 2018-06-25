<template>
	<div id="LibraryManagement">
		<h1>LibraryManagement</h1>
		<el-button type="primary" @click='foo'>主要按钮</el-button>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			foo(){
				this.$router.push('/LibraryManagement/VideoPlayback')
			}
		}
	}
</script>

<style>
</style>