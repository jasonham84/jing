<template>
	<div id="uploadTemplate">				
		<div>
		<el-progress :percentage="percentage"></el-progress>
		<div style="height: 12px;display: flex;justify-content: space-around;margin: 0 80px;font-size: 12px;line-height: 12px;" >
			<span  style="margin-right: 20px;display: inline-block;width: 70px;">{{speed}}</span>
			<span  style="display: inline-block;width:80px;">{{restTime}}</span>
		</div>
		</div>
		
		<!--<el-button type="primary" @click="stop" size="mini">暂停</el-button>
		<el-button type="primary" @click="start" size="mini">开始</el-button>-->
	</div>
</template>
<script>
	const fs = require("fs");
	var filename=`${__dirname}/../../assets/data.json`;
  
	export default{
		props:["file"],
		data(){
			return{
				percentage:0,
				speed:"0/kb",
				restTime:"------",
				flage:false,
				stopStatus:false,
				number:0
				
			}
		},
// 		computed: {
// 			file() {
// 				var data = this.$store.state.Counter.data;
// 				console.log(data)
// 				var _this = this;
// 				   data.map(function(item){
// 						  if(item.id == _this.file1.id){
// 								
// 							return item; 
// 					 }
// 				})
// 			}
// 		},
//     watch: {
//     	file(newValue, oldValue) {
//     		 console.log(newValue, oldValue,"newValue, oldValue")
//     	}
//     },
		methods:{
      start(){
				console.log(this.file.id,"[[]]")
				if(this.file.upState == "1"){
					this.stopStatus = false				
					var path = this.file.path
					var _this = this
					// console.log(this.file,"start")
					this.Upload(this.file.currentNum,this.file)
// 					this.$store.commit("INCREMENT_MAIN_COUNTER")
// 					console.log(this.$store.state.Counter.main)
				}else if(this.file.upState == "2"){
					this.stopStatus = true
					var percentage = this.file.currentNum/this.file.size >1 ? 1: (this.file.currentNum/this.file.size)
					this.percentage = parseInt(percentage*100)
				}
					
			},
      stop(){
        	this.stopStatus = true
					// this.$store.commit("NEXT")
					// this.$store.commit("DECREMENT_MAIN_COUNTER")
			    console.log(this.file.id,"stop")
      },
// 			stop1(){
// 					this.stopStatus = true
// 					// this.$store.commit("NEXT")
// 					// this.$store.commit("DECREMENT_MAIN_COUNTER")
// 					console.log(this.file)
// 			},
      Upload(start,file){
        	var type = file.type				    	 
        	var buf = new Buffer(1024*1024);
        	var _this = this
					console.log(file.id)
        	fs.open(file.path, 'r', function(err, fd) {
							if (err) {
									return console.error(err);
							}

							fs.read(fd, buf, 0, buf.length, start, function(err, bytes){
									if (err){
										console.log(err);
									}
									
									if(bytes > 0){
								
								var content = buf.slice(0, bytes)
								_this.number += content.length
								if(!_this.stopStatus){
									_this.send_data(content,file,(start+buf.length))
								}else{
									console.log(file,"stop",_this.$store.getters.number)
								}
								
							}
						})
        	})
      },
        send_data(Blod,file,currentNum){			    	
        			var fd = new FormData();
        			var _this = this;
        			var timestampStart = new Date().getTime();
        	        fd.append('file', Blod);
        	        fd.append('filename', file.name);				               
        	        var xhr = new XMLHttpRequest();
        	        xhr.open('post', 'http://localhost:8888/video', true);
        	        xhr.onreadystatechange = function () {
        	            if (xhr.readyState == 4 && xhr.status == 200) {
						              Blod = null;              
        									var timestampEnd = new Date().getTime();
        									var time = (timestampEnd-timestampStart)/1000
        									var speed = 1/time	
        									// file.currentNum = currentNum
													var obj = {									
														"id":file.id,
														"key":"currentNum",
														"value":currentNum
													}
													_this.$store.commit("goo",obj)

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
												var percentage = currentNum/file.size >1 ? 1: (currentNum/file.size)   
        									_this.percentage = parseInt(percentage*100)
													
													
																			if(currentNum<file.size){
													
																						_this.Upload(currentNum,file)
																						
																				}else{
																						console.log("上传完成")
																						_this.stopStatus = false
																						_this.speed = ""
																						_this.restTime = ""
																						var obj = {									
																							"id":file.id,
																							"key":"upState",
																							"value":"8"
																						}
																						_this.$store.commit("goo",obj)
																						// _this.$store.commit("DECREMENT_MAIN_COUNTER")
																						// console.log(_this.$store.state.Counter.main)
																						_this.$store.commit("NEXT")
																						
																				}		
// 											 	
        	            }
        	        }
        	       
        	        xhr.send(fd);
        		}
		},
		mounted(){
			this.start()			
		},
		beforeDestroy(){
			// this.stop()
			console.log("beforeDestroy",this.file.id)
		}
		
	}
</script>
<style>
	#uploadTemplate .el-progress__text{
		display: none;
	
	}
</style>