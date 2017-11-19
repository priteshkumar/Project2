var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require("../db.js");


//Define 5 API Routes
//Post to Bucketlist Table 
router.post("/api/new", function(req, res, next){
	const title = req.body.title;
	const info = req.body.info;
	const id = req.user.user_id;
	db.query("INSERT INTO bucketlist (title, info, id) VALUES (?,?,?)", [title, info, id], function(error, results, fields){
		if (error) throw error;
		res.send(results);
	})
});

//Get all from bucketlist table

router.get("/api/all", function(req, res , next){
	db.query("SELECT * FROM bucketlist", function(error, results, fields){
		res.json(results);
	})
});

//Delete from bucketlist table

router.delete("/api/delete", function(req, res, next){
	const id = req.body.id;
	db.query("DELETE FROM bucketlist WHERE id = ?", [id], function(error , results, fields){
		res.json(results);
	})
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.user);
	console.log(req.isAuthenticated());
	res.render('home', { title: 'Home' });
});

router.get('/profile', authenticationMiddleware(), function(req,res){
	res.render('profile', { title: 'Profile' });
})


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});


router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate(
	'local', {
		successRedirect: '/profile',
		failureRedirect: '/login'
}));

router.get('/logout', (req, res, next) => {
    req.logout()
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
})﻿

router.post('/register', function(req, res, next) {

	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
	req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
	req.checkBody('password', 'Password must be between 6-100 characters long.').len(6, 100);
	req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{6,}$/, "i");
	req.checkBody('passwordMatch', 'Password must be between 6-100 characters long.').len(6, 100);
	req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

	const errors = req.validationErrors();

	if(errors){
		console.log(`errors: ${JSON.stringify(errors)}`);

		res.render('register', {
			title: 'Registration-Error',
			errors: errors
		});
	} else {
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;



		bcrypt.hash(password, saltRounds, function(err, hash) {
			db.query("INSERT INTO users (username,email,password) VALUES (?, ?, ?)", [username, email, hash], function(error, results, fields){
				if(error) throw error;
				db.query("SELECT LAST_INSERT_ID() as user_id", function(error, results, fields){
					if(error) throw error;
					const user_id = results[0];
					console.log(results[0]);
					req.login(user_id, function(error){
						res.redirect("/");
					});
					res.render('register', { title: 'Registration Complete' });
				});
			});
		});
	};
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});
 
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }
}﻿

module.exports = router;
