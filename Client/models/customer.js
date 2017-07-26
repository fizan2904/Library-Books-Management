var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var CustomerSchema = mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	name : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	}
});

var Customer = module.exports = mongoose.model('Customer', CustomerSchema);

module.exports.createUser = function(newCustomer, callback){
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newCustomer.password, salt, function(err, hash){
			newCustomer.password = hash;
			newCustomer.save(callback);
		});
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username : username};
	Customer.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	 bcrypt.compare(candidatePassword, hash, function(err, isMatch){
	 	if(err) throw err;
	 	callback(null , isMatch);
	 });
}

module.exports.getUserById = function(id, callback){
	Customer.findById(id, callback);
}