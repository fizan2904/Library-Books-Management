var express = require('express'),
	router = express.Router(),
	Cart = require('../models/cart'),
	Book = require('../models/book');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash('success_msg', 'Login to continue');
		res.redirect('/customers/login');
	}
}

router.get('/:_id', ensureAuthenticated, function(req, res, next){
	var id = req.session.passport.user._id;
	var _id = req.params._id;
	console.log(_id);

	Book.find({_id:_id}, 'title price', function(err, docs){
		if(err) throw err;
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		var newArray = doc.map(function(el){
			return el.title;
		});
		var newprice = doc.map(function(el){
			return el.price;
		});
		var bookname = newArray[0];
		var price = newprice[0];
		
		var newItem = new Cart({
			userid : id,
			bookid : _id,
			bookname : bookname,
			price : price
		});

		Cart.createItem(newItem, function(err, item){
			if(err) throw err;
		});
	});

	req.flash('success_msg', 'Added to cart');

	res.redirect('/dashboard/listbooks');

});

module.exports = router;