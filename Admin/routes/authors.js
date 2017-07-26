var express = require('express');
var router = express.Router();

var Author = require('../models/author');

router.get('/listauthors', function(req, res, next){
	Author.find({}, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		console.log(doc);
		res.render('listauthors', {docs:doc});
	});
});

router.get('/uploadauthor', function(req, res, next){
	res.render('uploadauthor');
});

router.post('/uploadauthor', function(req, res, next){
	var author = req.body.author;

	req.checkBody('author', 'Author is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('uploadauthor', {
			errors : errors
		});
	}else{
		var newAuthor = new Author({
			author : author
		});
		Author.saveGenre(newAuthor, function(err, author){
			if (err) {
			    console.log('Error Inserting New Data');
			    if (err.name == 'ValidationError') {
			        for (field in err.errors) {
			            console.log(err.errors[field].message); 
			        }
			    }
			}
			console.log(author);
		});

		req.flash('success_msg', 'Successfully Uploaded author');

		res.redirect('/authors/listauthors');
	}
});

module.exports = router;