var mongoose = require('mongoose');

var AuthorSchema = mongoose.Schema({
	author : {
		type : String,
		required : true
	}
});

var Author = module.exports = mongoose.model('Author', AuthorSchema);

module.exports.saveGenre = function(newAuthor, callback){
	newAuthor.save(callback);
}