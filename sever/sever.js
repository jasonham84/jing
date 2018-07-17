var http = require('http');

var fs = require("fs");
var url = require("url");

var obj = {}

http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain;application/json',"Access-Control-Allow-Origin":"*"});
  
   var route = req.url.replace(/\//,'')
    
   try{
   	 obj[route](req,res)
   }catch(err){
   	 
   }  
}).listen(8888);

obj = {
	"data":function(req,res){		
		fs.readFile('./data.json',function(err,data){
		    var str = data   
	            res.end(str);
		})
	},
	"data1":function(req,res){
		fs.readFile('./mohusoso/songName.json',function(err,data){
		    var str = data   
	            res.end(str);
		})
	},
	"data2":function(req,res){
		fs.readFile('./mohusoso/data2.json',function(err,data){
				var str = data   
							res.end(str);
		})
	},
	"video":function(req,res){
		var post = '';   
		 req.on('data', function(chunk){  
		 console.log(chunk)
        post += chunk;
    });
		req.on('end', function(){    
        
        res.end("1");
    });
		
	}
}

console.log('Server running at http://127.0.0.1:8888/');







