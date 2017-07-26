var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Book = require('../models/book');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash('success_msg', 'Login to continue');
		res.redirect('/customers/login');
	}
}

router.get('/', ensureAuthenticated, function(req, res, next){
	var id = req.session.passport.user._id;
	Cart.find({}, 'bookname price', function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('cart', {docs:doc});
	});
});

module.exports = router;