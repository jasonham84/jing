<template>
  <div id="wrapper">
  <!--<p> 
    <label>请选择一个文件：</label> 
        <input type="file" id="file" /> 
        <input type="button" value="读取图像" @click="readAsDataURL" /> 
        <input type="button" value="读取二进制数据"  /> 
        <input type="button" value="读取文本文件" @click="readAsText" />--> 
   <!-- </p> 
    <div id="result" name="result"></div> 
    <div  id="dropbox" style="border:3px dashed silver;width:200px; height:200px">将图片拖拽到此</div>-->  
   
   <el-row type="flex" justify='center'>   	
   	    <div id="dropbox" style="width: 200px;display: flex;justify-content: center;flex-direction: column;align-items: center;">
   	    	<i class="el-icon-document" style="font-size: 80px;color: #d7d7d7;"></i>
   	    	<p style="font-size: 14px;color: #333333;">暂无歌曲上传</p>
   	     <div class="way2">  
            <label>歌曲导入<input type="file" id='file' hidden @change="readAsBinaryString"></label>       
         </div>
        <p style="font-size: 14px;color: #333333;">或将文件拖入框中</p>
   	    </div>
   		  
   	 	   
   </el-row>
   
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
//  readAsDataURL(){ 
//  //检验是否为图像文件 
//  var file = document.querySelector("#file").files[0]; 
//  if(!/image\/\w+/.test(file.type)){ 
//      alert("看清楚，这个需要图片！"); 
//      return false; 
//  } 
//  var reader = new FileReader(); 
//  //将文件以Data URL形式读入页面 
//  reader.readAsDataURL(file); 
//  reader.onload=function(e){ 
//      var result=document.querySelector("#result"); 
//      //显示文件 
//      result.innerHTML='<img src="' + this.result +'" alt="" />'; 
//   } 
//  },
   readAsBinaryString(){ 
   	
   var file = document.querySelector("#file").files[0]; 
   console.log(file.slice(0,200))
  var reader = new FileReader(); 
//  console.log(file)
//  //将文件以二进制形式读入页面 
   reader.readAsArrayBuffer(file.slice(0,200)); 
  reader.onload=function(f){ 
  	console.log(reader.result)
//      var result=document.querySelector("#result"); 
//      //显示文件 
//      result.innerHTML=this.result; 
   } 
},
		uploadFile: function (file) {
		  console.log(file);
		 },
		 onDrag: function (e) {
		  e.stopPropagation();
		  e.preventDefault();
		 },
		 onDrop: function (e) {
		 	console.log("ppp")
		  e.stopPropagation();
		  e.preventDefault();
		  var dt = e.dataTransfer;
		  for (var i = 0; i !== dt.files.length; i++) {
		   this.uploadFile(dt.files[i]);
		  }
		 }    
    },
    mounted: function () {
			 var dropbox = document.querySelector('#dropbox');
			 dropbox.addEventListener('dragenter', this.onDrag, false);
			 dropbox.addEventListener('dragover', this.onDrag, false);
			 dropbox.addEventListener('drop', this.onDrop, false);
 }
  }
</script>

<style>
	#dropbox{
		border:3px dashed silver;
		border-radius: 8px;
		padding: 10px;
	}
  .way2 {
            width: 140px;
            position: relative;
            background: #ededed;
            border-radius: 4px;
            height: 40px;
            line-height: 45px;
            color: #fff;
            font-size: 14px;
				    background-color: #409EFF;
				    border-color: #409EFF;
				    
        }
 .way2 label {
            display: block;
            width: 100%;
            height: 40px;
            text-align: center;
            cursor: pointer;
        }

.way2 label:hover{
	  background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
    border-radius: 4px;
}
.way2 label:active{
	  background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
    border-radius: 4px;
}    
</style>
