var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local'),Strategy;
var mongo = require('mongodb')
var path = require('path');
var cookieParser = require('cookie-parser');

mongoose.connect('mongodb://localhost/books');
var db = mongoose.connection;

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout : 'layout' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret : 'secret',
	saveUninitialized : false,
	resave : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
	errorFormatter : function(param, msg, value){
		var namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;
		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}return{
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));
app.use(flash());
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('Error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

var index = require('./routes/index');
var customers = require('./routes/customers');
var dashboard = require('./routes/dashboard');
var cart = require('./routes/cart');
var checkout = require('./routes/checkout');
var addcart = require('./routes/addcart');

app.use('/', index);
app.use('/customers', customers);
app.use('/dashboard', dashboard);
app.use('/cart', cart);
app.use('/checkout', checkout);
app.use('/addcart', addcart);

app.listen(4000);