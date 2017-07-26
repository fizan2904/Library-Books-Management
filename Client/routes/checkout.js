var express = require('express'),
	router = express.Router(),
	Cart = require('../models/cart');

router.get('/', ensureAuthenticated,function(req, res, next){
	var id = req.session.passport.user._id;
	Cart.remove({userid:id}, function(err, docs){
		if(err) throw err;
		console.log(docs);
	});

	req.flash('success_msg', 'Checked Out');

	res.redirect('/dashboard');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash('success_msg', 'Login to continue');
		res.redirect('/customers/login');
	}
}

module.exports = router;