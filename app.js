var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

var configDB = require('./config/database.js');

// configuration ===========================================================
mongoose.connect(configDB.url);// connect to database

require('./config/passport.js')(passport); // pass passport for configuration

app.configure(function () {
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/public/views'); // __dirname = root folder.
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser())// read cookies (needed for auth)
	app.use(express.bodyParser());// get information from html forms
	
//required for passport
	app.use(express.session({secret: "secret"}));
	app.use(passport.initialize());
	app.use(flash()); // use connect-flash for flash messages stored in session
	app.use(passport.session());// persistent login sessions
	app.use(app.router);
});
// routes ======================================================================
require('./app/routes.js')(app, passport);// load our routes and pass in our app and fully configured passport


//If you host the application on Modulus the PORT environment variable will be defined,
//otherwise I’m simply using 8080.
app.listen(3000, function(){
	console.log("now listening to 3000");
});