var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
	userid : {
		type : String,
		required : true
	},
	bookid : {
		type : String,
		required : true
	},
	bookname : {
		type : String
	},
	price : {
		type : String
	}
});

var Cart = module.exports = mongoose.model('Cart', CartSchema);

module.exports.createItem = function(newItem, callback){
	newItem.save(callback);
}
