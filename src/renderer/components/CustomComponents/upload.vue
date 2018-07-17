<template>
	<div id="uploadTemplate">				
		<div>
		<el-progress :percentage="percentage"></el-progress>
		<div style="height: 16px;display: flex;justify-content: space-around;margin: 0 80px;font-size: 12px;" >{{isStop}}
			<span v-show="!stopStatus" style="margin-right: 20px;display: inline-block;width: 70px;">{{speed}}</span>
			<span v-show="!stopStatus" style="display: inline-block;width:80px;">{{restTime}}</span>
		</div>
		</div>
		
		<!--<el-button type="primary" @click="stop" size="mini">暂停</el-button>
		<el-button type="primary" @click="start" size="mini">开始</el-button>-->
	</div>
</template>
<script>
	const fs = require("fs");
	export default{
		props:["file","isStop"],
		data(){
			return{
				percentage:0,
				speed:"0/kb",
				restTime:"------",
				flage:false,
				stopStatus:false,
				
			}
		},
		methods:{
      start(){
					this.stopStatus = false
					var path = this.file.path
					var _this = this
					console.log(this.file)
					this.Upload(this.file.currentNum,this.file)
			},
      stop(){
        	this.stopStatus = true
					this.file.data = ""
					this.file.size = ""
			    console.log(this.file)
      },
      Upload(start,file){
        	var type = file.type				    	 
        	var buf = new Buffer(1024*1024);
        	var _this = this
        	fs.open(file.path, 'r+', function(err, fd) {
							if (err) {
									return console.error(err);
							}
// 							console.log("文件打开成功！");
// 							console.log("准备读取文件：");
							fs.read(fd, buf, 0, buf.length, start, function(err, bytes){
									if (err){
										console.log(err);
									}
									// console.log(bytes + "  字节被读取");
									
									// 仅输出读取的字节
									if(bytes > 0){
									// console.log(buf.slice(0, bytes).toString());
								var content = buf.slice(0, bytes)
								if(!_this.stopStatus){
									_this.send_data(content,file,(start+buf.length))
								}
							}
						})
        	})
      },
        send_data(Blod,file,currentNum){			    	
        			var fd = new FormData();
        			var _this = this;
        			var timestampStart = new Date().getTime();
        			// var stepSize = 1024*1024;
        	        fd.append('file', Blod);
        	        fd.append('filename', file.name);				               
        	        var xhr = new XMLHttpRequest();
        	        xhr.open('post', 'http://localhost:8888/video', true);
        	        xhr.onreadystatechange = function () {
        	            if (xhr.readyState == 4 && xhr.status == 200) {				               
        	//                 console.info(xhr.responseText);	
        									var timestampEnd = new Date().getTime();
        									var time = (timestampEnd-timestampStart)/1000
        									var speed = 1/time	
        									file.currentNum = currentNum
        									if(speed<1){
        										_this.speed = Math.floor(speed*1024)+"kb\/s"
        									}else{
        										_this.speed = speed.toFixed(2)+"m\/s"
        									}
        								
        								var restNumber = Math.floor((file.size-currentNum)/(1024*1024*speed)<0 ? 0:((file.size-currentNum)/(1024*1024*speed)))
												
												    var p1 = Math.floor(restNumber/3600) > 9 ? Math.floor(restNumber/3600) : "0"+Math.floor(restNumber/3600);
														var p2 = Math.floor(restNumber/60%60) >9 ? Math.floor(restNumber/60%60) : "0"+Math.floor(restNumber/60%60);
														var p3 = Math.floor(restNumber%60)>9 ? Math.floor(restNumber%60) : "0"+Math.floor(restNumber%60);
												_this.restTime = p1+":"+p2+":"+p3;
                         // console.log(_this.restTime)
												var percentage = currentNum/file.size >1 ? 1: (currentNum/file.size)
        								   // console.log(parseInt(percentage*100))
        									_this.percentage = parseInt(percentage*100)
        	                if(currentNum<file.size){
        		
        											_this.Upload(currentNum,file)
        											
        									}else{
        											console.log("上传完成")
        											_this.stopStatus = false
        											_this.speed = ""
        											_this.restTime = ""
        									}
        	            }
        	        }
        	       
        	        xhr.send(fd);
        		}
		},
		watch: {
			isStop(newValue, oldValue) {
				  console.log(newValue, oldValue)
			}
		},
		mounted(){
			this.start()
			console.log(this.file)
		},
		beforeDestroy(){
			this.stopStatus = true
			console.log(this.stopStatus)
		}
		
	}
</script>
<style>
	#uploadTemplate .el-progress__text{
		display: none;
	
	}
</style>