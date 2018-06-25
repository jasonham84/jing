<template>
	<div id="CustomManagement" @keydown="whichButton(event)">
		<div style="background: yellow;height: 30px;"></div>
		
		<div class="CustomManagement_a" @mouseenter="mouseenter" @mouseleave="mouseleave" >			
			<span class="videoS" v-show="flage">
				<div style="height: 100%;width: 150px;display: flex;align-items:center;justify-content: space-around;">
					<i class="iconfont icon-shangyishou videobofang" @click.stop.self="foo6"></i>
					<i class="iconfont icon-xiazaizanting videobofang" @click.stop.self="foo4" v-if="flage4"></i>
					<i class="iconfont icon-sanjiao videobofang" @click.stop.self="foo5" v-else></i>
					<i class="iconfont icon-xiayishou videobofang" @click.stop.self="foo7"></i>
				</div>
				<div class="block" style="height: 100%;flex: 1;padding-top: 8px;box-sizing: border-box;">				    
				    <el-slider v-model="value2" @change='change' :show-tooltip="false"></el-slider>
				    
				</div>
				<div style="height: 100%;width: 100px;display: flex;align-items: center;justify-content: center;font-size: 20px;color: white;">
					{{time1}} / {{time2}}
				</div>
				<div style="width: 60px;height: 100%;display: flex;align-items: center;box-sizing: border-box;padding: 0 20px;flex-direction: column;">
					<i class="iconfont icon-yinliang videobofang" style="margin-top: 10px;" @click="shenyin"></i>
					 <div class="block" style="margin-top: -100px;" v-show="flage3">
					    <el-slider
					      v-model="value1"
					      vertical
					      @change='change1'
					      height="60px">
					    </el-slider>
					</div>
				</div>
				
				<div style="width: 60px;height: 100%;display: flex;align-items: center;justify-content: center;">
					<i class="iconfont icon-quanping videobofang" @click.stop.self="quanScreen"></i>
				</div>
			</span>
			<span class="videoM" v-show="flage1" @click.stop="foo1">
				<i class="iconfont icon-bofang1 videobofang" style="font-size: 40px;" @click.stop="foo2"></i>				
			</span>
			
			<span class="videoM" v-show="flage2">
				<i class="iconfont icon-zhongbo videobofang" style="display: flex;flex-direction: column;margin-right: 20px;"></i>
				<i class="iconfont icon-xiazai videobofang"  style="display: flex;flex-direction: column;margin-left: 20px;"></i>
			</span>
			<video id="video" class="video1" preload="load" loop="loop" @click.stop.self="foo3">				
		        <source :src="src" />		   		    
	        </video>
		</div>	    	
	</div>
</template>

<script>
	const fs = require('fs');
	import axios from 'axios';
	export default{
		data(){
			return{
				flage:false,
				flage1:true,
				flage2:false,
				flage3:false,
				flage4:true,
				flage5:true,
				myVideo:'',
				value1:0,
				value2:0,
				vertical:true,
				time1:'',
				time2:'',
				time3:"",
				currentNum:0,
				windowHeight:'',
				windowWidth:"",
				src:"",
				data:[
				  "http://221.228.226.15/13/h/j/x/o/hjxoorqntjapgioycqdqwivmtlkcwf/hd.yinyuetai.com/30B001630A6A9C1365CFA757556226F8.mp4?sc=ed447b74660550dd",
				  "http://220.170.49.104/13/y/d/n/e/ydneivsxieianwkqsfpeaxbprsjgcg/hd.yinyuetai.com/16F20163ECC5F81C9367B527EF1BC0C3.mp4?sc=df6b447bd6298560",
				  "http://221.228.226.18/14/n/m/h/v/nmhvadrhqevldhwqxbtjbkjjksqpdz/hd.yinyuetai.com/50FF0158666031B0FFEA83BE8E2D3083.mp4?sc=b8d7bcdb5c445c61",
				  "http://221.228.226.15/14/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711"
				]
			}
		},
		methods:{
			quanScreen(){
				var ele = document.querySelector('.CustomManagement_a');
				    ele.style.width = '100%';
				    ele.style.height = '100%';
			if(this.flage5){				    					    
                if (ele.requestFullscreen) {
				        ele.requestFullscreen();
				    } else if (ele .mozRequestFullScreen) {
				        ele.mozRequestFullScreen();
				    } else if (ele .webkitRequestFullScreen) {
				        ele.webkitRequestFullScreen();
				    }
				    
		        }else{ 
		        	
				 	if (document.exitFullscreen) {
				            document.exitFullscreen();
				    } else if (document.mozCancelFullScreen) {
				            document.mozCancelFullScreen();
				    } else if (document.webkitCancelFullScreen) {
				            document.webkitCancelFullScreen();
				    }
				 	
				 }
				 
				 this.flage5 = !this.flage5
				
			},
			mouseenter(){
//				if(!this.flage1){
//					this.flage = true
//				}
               
//				console.log('mouseenter')
			},
			mouseleave(){
//				if(!this.flage){
//					this.flage = false
//				}
//				console.log('mouseleave')
			},
			whichButton(event){
				console.log(event.keyCode)
			},
			foo1(){
				console.log('1')
			},
			foo2(){
				console.log('2')
				var _this = this
				this.myVideo.play()
				this.flage1 = false
				this.flage = true
				setTimeout(function(){
					_this.flage = false
				},10008800)
			},
			foo3(){
				console.log('3')
				if(!this.myVideo.paused){
					this.myVideo.pause()
					this.flage1 = true
					this.flage = false
				}
			},
			foo4(){
				if(!this.myVideo.paused){
					this.myVideo.pause()
					this.flage4 = !this.flage4
					this.flage = true
				}
			},
			foo5(){
				if(this.myVideo.paused){
					this.myVideo.play()
					this.flage4 = !this.flage4
					
				}
			},
			foo6(){
				
				
			},
			foo7(){
				var num = this.data.length;
				var currentNum = this.currentNum;
				console.log(num,currentNum)
				if(currentNum<num-1){
					this.currentNum++
					
				}else{
					this.currentNum = 0
					
				}
				this.src = this.data[this.currentNum]
				this.myVideo.load()
				this.myVideo.play()
			},
			change(num){
				console.log(num)
				 this.myVideo.currentTime=this.time3*num/100;
				  
//                console.log(this.time3*num/100,'ooooooo')    
			},
			change1(num){
				console.log(num)
				this.myVideo.volume=num/100
			},
			shenyin(){
				this.flage3 = !this.flage3
			},
			time(mss,flage){
				var hours = parseInt(mss / 3600);
				var minutes =hours? parseInt(mss % 3600/60) : parseInt(mss/60);
				var seconds = parseInt(mss % 60) > 9 ? parseInt(mss % 60): "0"+parseInt(mss % 60);
				var str= ""
				
				if(hours){
					str += hours+":"+minutes+":"+seconds
				}else if(minutes){
					str += minutes+":"+seconds
				}else{
					str += "00:"+seconds
				}
				if(flage){
					 this.time3 = mss
					 this.time2 = str
				}else{
					this.time1 = str
				}
			},
			detail(){
				this.src  = this.data[0]
			}
			
		},
		mounted(){
			var _this = this
			this.detail();
			console.log(window.innerHeight,window.innerWidth,window.screen.height,window.screen.width)
			this.windowHeight = window.screen.height
			this.windowWidth  = window.screen.width
			this.myVideo = document.querySelector('#video')			
			this.myVideo.addEventListener("ended",function(){
                 _this.flage2 = true
                 _this.flage = false
            })
			console.log(this.myVideo.volume,'pppp')
			  this.myVideo.addEventListener(
				    "timeupdate", 
				    function(event){
				    
				      var num = (this.currentTime/this.duration)*100				     
				      _this.value2 = num
				      _this.time(this.duration,true)				      				      
				      _this.time(this.currentTime,false)				      
				    });
		      window.onresize = function() {
		      	setTimeout(function(){
		      		 var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
                      if (isFull === undefined) isFull = false;
                         if(isFull){
                         	_this.flage5 = false
                         }else{
                         	_this.flage5 = true
                         }
		      	},100)
               
		      }
		}
	}
</script>

<style scoped="scoped">
	#CustomManagement video::-webkit-media-controls-enclosure {
    /*禁用播放器控制栏的样式*/
    display: none !important;
   }
	#CustomManagement{
		display: flex;
		flex-direction: column;
		height:100%
		
	}
	.video1{
		width: 100%;
		height: 100%;
	}
	video{
		margin: 0;
		padding: 0;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
	}
	.CustomManagement_a{
		flex: 1;
		height: 100%;		
		position: relative;	
		background: black;	
				
	}
	#CustomManagement .videobofang{
		color: white;
		font-size: 30px;
		cursor: pointer;
		
	}
	#CustomManagement .videobofang:hover{
		
		text-shadow: 0px -2px 20px white;
	}
	#CustomManagement .videoS{
		display: flex;
		height: 50px;
		width: 100%;
		background: rgba(0, 0, 0, 0.51);
		position: absolute;
		left: 0;
		bottom: 0;		
		z-index:317483647;		
	}
	.videoM{
		display: block;
		width:100%;
		height: 100%;
		position: absolute;
		background: rgba(0, 0, 0, 0.51);
		display: flex;
		justify-content: center;
		align-items: center;		
		left: 0;
		top: 0;
		z-index: 15;
	}
</style>