var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	"userId":String,
	"userName":String,
	"userPwd":String,
	"orderList":Array,
	"cartList":[
	{
      "productId":String,
      "productName":String,
      "prodcutPrice":String,
      "productImg":String,
      "checked":String,
      "productNum":String 
	}
	],
	"addressList":[
	{
		"addressId":String,
		"userName":String,
		"addressName":String,
		"postCode":Number,
		"tel":Number,
		"defaultAddress":Boolean
	}
	]
});


module.exports = mongoose.model('User',userSchema);
