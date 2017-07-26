var router = require('express').Router();

router.route('/')

	.get(ensureAuthenticated, function(req, res, next){
		res.render('dashboard');
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