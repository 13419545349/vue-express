const http = require('http');
const url = require('url');
const util = require('util');
const server = http.createServer(function(req,res){
   if(req.url == "/favicon.ico"){
   	   return
   }
   res.statusCode = 404;
   res.setHeader('Content-Type','text/plain;charset=utf-8');
   res.write(util.inspect(url.parse("http://localhost:1234/index?username=liuxinchao&age=25")))
   res.end(util.inspect(url.parse(req.url)))

});
server.listen(1234,function(){
	console.log("服务器运行在1234端口")
})