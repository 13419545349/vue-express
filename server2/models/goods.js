var mongoose = require('mongoose')
var Schema = mongoose.Schema
var productSchema = new Schema({
	"productId":{type:String},
	"productName":String,
	"prodcutPrice":Number,
	"checked":String,
	"productNum":Number,
	"productImg":String
});

module.exports = mongoose.model('Good',productSchema);

