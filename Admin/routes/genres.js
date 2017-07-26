var express = require('express');
var router = express.Router();

var Book = require('../models/book');
var Genre = require('../models/genre');

router.get('/listgenres', function(req, res, next){
	Genre.find({}, function(err, docs){
		var doc = JSON.stringify(docs);
		doc = JSON.parse(doc);
		res.render('listgenres', {docs:doc});
	});
});

router.get('/uploadgenre', function(req, res, next){
	res.render('uploadgenre');
});

router.post('/uploadgenre', function(req, res, next){
	var genre = req.body.genre;

	req.checkBody('genre', 'Genre is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('uploadgenre', {
			errors : errors
		});
	}else{
		var newGenre = new Genre({
			genre : genre
		});

		Genre.saveGenre(newGenre, function(err, genre){
			if (err) {
			    console.log('Error Inserting New Data');
			    if (err.name == 'ValidationError') {
			        for (field in err.errors) {
			            console.log(err.errors[field].message); 
			        }
			    }
			}
			console.log(genre);
		});

		req.flash('success_msg', 'Successfully Uploaded genre');

		res.redirect('/genres/listgenres');
	}
});

module.exports = router;