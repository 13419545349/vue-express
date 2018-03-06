const http = require('http')
const url = require('url')
const fs  = require('fs')
const util = require('util')


const server = http.createServer((req,res)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain;charset=utf-8');
	if(req.url == 'favicon.ico'){return}
	 let file = '.'+ url.parse(req.url).pathname;
     console.log(file);
     fs.readFile( file,function(err,data){
     	if(err){
     		res.writeHeader(404,{
     			'Content-Type':'text/html'
     		})
     	}else{
     		res.writeHeader(200,{
     			'Content-Type':'text/html'
     		})
     		res.end(data.toString())
     }
 });
})

server.listen(2222,()=>{
	console.log('服务器运行在2222端口')
})