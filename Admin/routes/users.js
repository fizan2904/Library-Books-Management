var express = require('express');
var router = express.Router();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

router.get('/login', function(req, res, next){
	res.render('login');
});

router.get('/register', function(req, res, next){
	res.render('register');
});

router.post('/register', function(req, res, next){
	var name = req.body.name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('username', 'UserName is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Password do not match').equals(password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register', {
			errors : errors
		});
	}else{
		var newUser = new User({
			name : name,
			username : username,
			email : email,
			password : password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Successfully registered');

		res.redirect('login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
    	if(err) throw err;
    	if(!user){
    		return done(null, false, {message : 'Unknown user'});
    	}
    	User.comparePassword(password, user.password, function(err, isMatch){
    		if(err) throw err;
    		if(isMatch){
    			return done(null, user);
    		}else{
    			return done(null, false, {message: 'Password is incorrect'});
    		}
    	});
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  }
 );

router.get('/logout', function(req, res, next){
	req.logout();
	req.flash('success_msg', 'Logged out successfully');
	res.redirect('login');
});

module.exports = router;