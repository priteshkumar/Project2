var exports = module.exports = {}


exports.register = function(req,res){

	res.render('register', {title: 'Register'}); 

}

exports.login = function(req,res){

	res.render('login', {title:'login'}); 

}

exports.profile = function(req,res){

	res.render('profile', {title: 'profile'}); 

}

exports.logout = function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/');
  });

}