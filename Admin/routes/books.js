var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose');

var Book = require('../models/book');

router.get('/registerbook', function(req, res, next){
	res.render('bookregister');
});

router.post('/registerbook', function(req, res, next){
	var title = req.body.title;
	var author = req.body.author;
	var genre = req.body.genre;
	var	description = req.body.description;
	var	price = req.body.price;

	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('author', 'Author name is required').notEmpty();
	req.checkBody('genre', 'Genre is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('registerbook', {
			errors : errors
		});
	}else{
		var newBook = new Book({
			title : title,
			author : author,
			genre : genre,
			description : description,
			price : price
		});

		Book.saveBook(newBook, function(err, book){
			if(err) throw err;
			console.log(book);
		});

		req.flash('success_msg', 'Successfully Uploaded book');

		res.redirect('registerbook');
	}
});

router.get('/listbooks', function(req, res, next){
	Book.find({}, 'title author genre', function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('listbooks', {docs:doc});
	});
});

router.get('/listbooks/:id', function(req, res, next){
	var id = req.params.id;
	Book.getBookById(id, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		console.log(doc);
		res.render('listbook', {docs:doc});
	});
});

router.get('/listbooksbyauthor/:author', function(req, res, next){
	var author = req.params.author;
	Book.find({author:author}, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('listbooks', {docs:doc});
	});
});

router.get('/listbooksbygenre/:genre', function(req, res, next){
	var genre = req.params.genre;
	Book.find({genre:genre}, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('listbooks', {docs:doc});
	});
});

router.get('/editbook/:id', function(req, res, next){
	var id = req.params.id;
	Book.getBookById(id, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('editbook', {docs:doc});
	});
});

router.post('/editbook/:id', function(req, res, next){
	var body = req.body;
	var id = req.params.id;
	console.log(body, id);
	Book.findByIdAndUpdate(id, body, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		console.log(doc);
		res.redirect('/books/listbooks/' + id);
	});
});

module.exports = router;