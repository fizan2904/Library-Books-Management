var mongoose = require('mongoose');

var GenreSchema = mongoose.Schema({
	genre : {
		type : String,
		required : true
	}
});

var Genre = module.exports = mongoose.model('Genre', GenreSchema);

module.exports.saveGenre = function(newGenre, callback){
	newGenre.save(callback);
}