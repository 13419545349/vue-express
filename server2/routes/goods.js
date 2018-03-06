var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods.js');
var Users = require('../models/user.js');

//链接mongooDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/shangcheng');

mongoose.connection.on('connected',function(){
	console.log('数据库连接成功')
})


router.get('/',function(req,res,next){
	let page = parseInt(req.param('page'));
	let pageSize = parseInt(req.param('pageSize')); 
	let priceLevel = req.param('priceLevel');
	let sort = req.param('sort');
	let skip = (page-1)*pageSize;
	var priceGt = '',priceLte = '';
	let params = {};
	if(priceLevel != 'all'){
	 switch(priceLevel){
		case '0':priceGt = '0'; priceLte = '2000';break;
		case '1':priceGt ='2000'; priceLte = '4000';break;
		case '2':priceGt = '4000';priceLte = '6000';break;
	}
     params = {
     	prodcutPrice: {
     		$gt: priceGt,
     		$lte: priceLte
     	}
     }
};  
    console.log(params)
	let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
	goodsModel.sort({'prodcutPrice':sort});
	goodsModel.exec(function(err,result){
		if(err){
			res.json({
				status:'1',
				msg:err.messsage
			});
		}else{
			res.json({
				status:'0',
				msg:'',
				result:result
			})
		}
	})
	 /*Goods.find({},function(err,result){
	 	res.json({
	 		result:result
	 	});
	 })*/
});


//加入购物车
router.post('/addCart',function(req,res,next){
	var userId = '110' 
	var productId = req.body.productId;
	Users.findOne({
		userId:userId
	},function(err,userDoc){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}else{
			console.log("userDoc:" + userDoc )
			if(userDoc){
				let goodsItem = '';
				userDoc.cartList.forEach(function(item){
					if(item.productId == productId){
						goodsItem = item;
						item.productNum ++;
					}
				});
				if(goodsItem){
                      userDoc.save()
				}else{
					Goods.findOne({productId:productId},function(err1,doc){
					if(err1){
						res.json({
							status:'1',
							msg:err1.message
						})
					}else{
						doc.productNum = 1;
						doc.checked = 1;
						userDoc.cartList.push(doc);
						userDoc.save()
					}
				})
				}
				
			}
			res.send("OK")
		}
	})
})
		

router.get('/add',function(req,res,next){
	res.send('您好啊')
})
    
module.exports = router;