var flash= require('connect-flash');
var User  = require('../app/models/user');
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});
	
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('loginPage.ejs', { message: req.flash('loginMessage') }); 
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signUp.ejs',{ message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/signUp', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/home', isLoggedIn, function(req, res) {
		res.render('home.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


app.get('/mama', function(req, res) {
  res.render("mama",{
  	user : req.user
  });
});
app.get('/papa', function(req, res) {
  res.render("papa",{
  	user : req.user
  });
});
app.get('/myPhoto', function(req, res) {
  res.render("myPhoto",{
  	user : req.user
  });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated()){
		return next();
	}
	// if they aren't redirect them to the home page
	res.redirect('/');
}
};
