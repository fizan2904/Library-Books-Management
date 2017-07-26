var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
	title : {
		type : String,
		required : true
	},
	author : {
		type : String,
		required : true
	},
	genre : {
		type : String,
		required : true
	},
	description : {
		type : String
	},
	price : {
		type : String
	}
});

var Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.saveBook = function(newBook, callback){
	newBook.save(callback);
}

module.exports.getBookById = function(id, callback){
	Book.findById(id, callback);
}