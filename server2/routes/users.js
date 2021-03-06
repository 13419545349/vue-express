var express = require('express');
var router = express.Router();
require("./../util/util");
var User = require('./../models/user.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
   var param = {
   	userName:req.body.userName,
   	userPwd:req.body.userPwd
   }
   User.findOne(param,function(err,doc){
   	if(err){
   		res.json({
   			status:"1",
   			msg: err.message
   		});
   	}else{
         if(doc){
         	res.cookie("userId",doc.userId,{
         		path:'/',
         		maxAge:1000*60*60
         	});
         	res.json({
         		status:'0',
         		msg:'',
         		result:{
         			userName:doc.userName
         		}
         	})
         }
      }
   })
})

router.post('/logout',function(req,res,next){
   res.cookie("userId",'',{
      path:'/',
      maxAge:-1
   });
   res.json({
      status:'0',
      msg:''
   })
})


//查询当前用户的购物车数据
router.get('/cartList',function(req,res,next){
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
   if(err){
      res.json({
         status:'1',
         err:err.message,
         result:''
      });
   }else{
      if(doc){
         doc.cartList;
         res.json({
            status:'0',
            msg:'',
            result:doc.cartList
         });
      }
   }
})
})


//购物车删除操作  $push即添加，$pull即删掉
router.post('/cart/del',function(req,res,next){
 var userId = req.cookies.userId;
 var productId = req.body.productId;
 User.update({"userId":userId},{$pull:{"cartList":{"productId":productId}}},function(err,doc){
   if(err){
      res.json({
         status:'0',
         msg:err.message,
         result:''
      });
   }else{
      res.json({
         status:'1',
         msg:'',
         result:'suc'
      })
   }
})
})


//修改购物车商品数据
router.post("/cartEdit",function(req,res,next){
   var userId = req.cookies.userId;
   var productId = req.body.productId;
   var productNum = req.body.productNum;
   var checked = req.body.checked;
   User.update({"userId":userId,"cartList.productId":productId},{"cartList.$.productNum":productNum,"cartList.$.checked":checked},function(err,doc){
      if(err){
         res.json({
            status:'1',
            msg:err.message,
            result:''
         });
      }else{
         res.json({
            status:'0',
            msg:'',
            result:'suc'
         });
      }
   })
})


//查询用户地址接口
router.get("/addressList",function(req,res,next){
   var userId = req.cookies.userId;
   User.findOne({"userId":userId},function(err,doc){
      if(err){
         res.json({
            status:"1",
            msg:err.message,
            result:""
         })
      }else{
         res.json({
            status:"0",
            msg:'',
            result:doc.addressList
         })
      }
   })
})

//设置默认地址接口
router.post("/setDefault",function(req,res,next){
   var userId = req.cookies.userId;
   var addressId = req.body.addressId;
   if(!addressId){
      res.json({
         status:"1003",
         msg:'addressId is null',
         result:''
      })
   }else{
    User.findOne({"userId":userId},function(err,doc){
      if(err){
         res.json({
            status:"1",
            msg:err.messsage,
            result:''
         })
      }else{
         var addressList = doc.addressList;
         addressList.forEach((item)=>{
            if(item.addressId == addressId){
               item.defaultAddress = true;
            }else{
               item.defaultAddress = false
            }
         });
         doc.save(function(err1,doc1){
            if(err){
               res.json({
                  status:'1',
                  msg:err.message,
                  result:''
               })
            }else{
               res.json({
                  status:'0',
                  msg:'',
                  result:''
               })
            }
         })
      }
   })
 }
 
})


//删除地址接口
//
router.post("/delAddress",function(req,res,next){
   var userId = req.cookies.userId;
   var addressId = req.body.addressId;
   User.update({"userId":userId},{
      $pull:{
         "addressList":{
            "addressId":addressId
         }
      }},function(err,doc){
         if(err){
            res.json({
               status:"1",
               msg:err.message,
               result:""
            })
         }else{
            res.json({
               status:"0",
               msg:"",
               result:"suc"
            })
         }
      })
})

//生成订单接口
router.post("/payMent",function(req,res,next){
   var userId = req.cookies.userId;
   var addressId = req.body.addressId;
   var ordertotal = req.body.ordertotal;
   User.findOne({"userId":userId},function(err,doc){
      if(err){
         res.json({
            status:"1",
            msg:err.message,
            result:""
         })
      }else{
         var address = '';
         var goodsList = [];
         //获取当前用户的地址信息
         doc.addressList.forEach((item)=>{
            if(addressId == item.addressId){
               address = item;
            }
         })
         //获取当前用户购物车的购买商品
         doc.cartList.filter((item)=>{
            if(item.checked == '1'){
               goodsList.push(item);
            }
         });

         var platform = '622';
         var r1 = Math.floor(Math.random()*10);
         var r2 = Math.floor(Math.random()*10);
         var sysDate = new Date().Format('yyyyMMddhhmmss');
         var createDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
         var orderId = platform + r1 + sysDate + r2;


         var order = {
            orderId:orderId,
            ordertotal:ordertotal,
            addressInfo:address,
            goodsList:goodsList,
            orderStatus:'1',
            createDate:createDate
         };

         doc.orderList.push(order);
         doc.save(function(err1,doc1){
            if(err1){
               res.josn({
                  status:"1",
                  msg:err.message,
                  result:''
               })
            }else{
              res.json({
                 status:"0",
                 msg:"",
                 result:{
                  orderId:order.orderId,
                  ordertotal:order.ordertotal
               }
            });
           }
        })


      }
   })
})


//根据订单ID查询订单信息
router.get("/orderDetail",function(req,res,next){
   var userId = req.cookies.userId;
   var orderId = req.param("orderId");
   User.findOne({"userId":userId},function(err,userInfo){
      if(err){
         res.json({
            status:"1",
            msg:err.message,
            result:''
         });
      }else{
         var orderList1 = userInfo.orderList;
         if(orderList1.length >0 ){
            var ordertotal = 0;
            orderList1.forEach((item)=>{
               if(item.orderId == orderId){
                ordertotal = item.ordertotal;
             }
          });
            if(ordertotal>0){
               res.json({
                  status:"0",
                  msg:'',
                  result:{
                     orderId:orderId,
                     ordertotal:ordertotal
                  }
               })
            }
            else{
              res.json({
               status:'120002',
               msg:'无此订单',
               result:''
            })
           }

        }else{
         res.json({
            status:'120001',
            msg:'当前用户未创建订单',
            result:''
         })
      }
   }
})
})

router.get("/getCartCount",function(req,res,next){
     if(req.cookies && req.cookies.userId){
      var userId = req.cookies.userId;
      User.findOne({"userId":userId},function(err,doc){
         if(err){
            res.json({
               status:'1',
               msg:err.message,
               result:''
            })
         }else{
            var cartList = doc.cartList;
            let cartCount = 0;
            cartList.map(function(item){
               cartCount += parseInt(item.productNum);
            })
            res.json({
               status:'0',
               msg:'',
               result:cartCount
            })
         }
      })
     }
})


//checkLogin检查是否有登录
router.get("/checkLogin",function(req,res,next){
   var userId = req.cookies.userId;
   User.findOne({"userId":userId},function(err,doc){
      res.json({
         status:"0",
         msg:'',
         result:{
            userName:doc.userName,
            userPwd:doc.userPwd
         }
      })
   })
      
})

module.exports = router;
