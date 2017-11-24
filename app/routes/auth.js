var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

app.get('/register', authController.register);


app.get('/login', authController.login);


app.post('/register', passport.authenticate('local-signup', { 
	successRedirect: '/profile',
    failureRedirect: '/register'
	 }
  ));


app.get('/profile',isLoggedIn(), authController.profile);


app.get('/logout',authController.logout);


app.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));



function isLoggedIn() {
    return (req, res, next) => {
      console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
      if (req.isAuthenticated()) return next();
      res.redirect('/login');
    }
  }﻿
}






