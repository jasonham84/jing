<template>
	<div>
		<h1 @click="foo">SignIn</h1>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			foo(){
				this.$router.push('/Main')
			}
		},
		mounted(){
			
		}
	}
</script>

<style>
</style>