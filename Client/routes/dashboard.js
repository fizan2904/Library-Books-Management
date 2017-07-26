var express = require('express');
var router = express.Router();

var Author = require('../models/author');
var Book = require('../models/book');
var Genre = require('../models/genre');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash('success_msg', 'Login to continue');
		res.redirect('/customers/login');
	}
}

router.get('/', ensureAuthenticated, function(req, res, next){
	res.render('dashboard');
});

router.get('/listbooks', ensureAuthenticated, function(req, res, next){
	Book.find({}, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('listbooks', {docs:doc});
	});
});

router.get('/listbooks/:id', ensureAuthenticated, function(req, res, next){
	var id = req.params.id;
	Book.getBookById(id, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('listbook', {docs:doc});
	});
});

router.get('/listbooksbyauthor/:author', ensureAuthenticated, function(req, res, next){
	var author = req.params.author;
	Book.find({author:author}, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('listbooks', {docs:doc});
	});
});

router.get('/listbooksbygenre/:genre', ensureAuthenticated, function(req, res, next){
	var genre = req.params.genre;
	Book.find({genre:genre}, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('listbooks', {docs:doc});
	});
});

module.exports = router;