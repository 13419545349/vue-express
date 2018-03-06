const http = require('http');
const util = require('util');
const path = require('path');
console.log(path.join(__dirname,'public'));
http.get('http://www.imooc.com/u/card',function(res){
	let data = '';
	res.on('data',function(chunk){
		data += chunk;
	});
	res.on('end',function(){
		let result = JSON.parse(data);

		console.log(util.inspect(result));
	})
})