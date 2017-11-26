    var express    = require('express');
    var app        = express();
    var passport   = require('passport');
    var session    = require('express-session');
    var bodyParser = require('body-parser');
    var exphbs     = require('express-handlebars');
    var MySQLStore = require('express-mysql-session')(session);
    var env = require('dotenv').load()
    require('dotenv').config();

    //For BodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


     // For Passport
    var options = {
    port: 3306,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
    };

    var sessionStore = new MySQLStore(options);

    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      store: sessionStore,
      saveUninitialized: false,
      // cookie: { secure: true }
    }));

    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    //Handlebars isAuthenticated
    app.use(function(req, res, next){
      res.locals.isAuthenticated = req.isAuthenticated();
      next();
    });
     //For Handlebars
    app.set('views', './app/views')
    app.set('view engine', '.hbs');

    const hbs = require('hbs');
    const fs = require('fs');

    const partialsDir = __dirname + '/app/views/partials';

    const filenames = fs.readdirSync(partialsDir);

    filenames.forEach(function (filename) {
      const matches = /^([^.]+).hbs$/.exec(filename);
      if (!matches) {
        return;
      }
      const name = matches[1];
      const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
      hbs.registerPartial(name, template);
    });

    hbs.registerHelper('json', function(context) {
        return JSON.stringify(context, null, 2);
    });

    // Static directory
    app.use(express.static("public"));
    

    //Default HTML Route
    app.get('/', function(req, res){
      console.log(req.user);
	  res.render('login');
	});


	 //Models
    var models = require("./app/models");


    //Routes
    var authRoute = require('./app/routes/auth.js')(app,passport);
    require("./app/routes/user-api-routes.js")(app);
    require("./app/routes/post-api-routes.js")(app);


    //load passport strategies
    require('./app/config/passport/passport.js')(passport);


    //Sync Database
    //Remove force after first deployment
   	models.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')
      app.listen(5000, function(err){
    if(!err)
    console.log("Site is live"); else console.log(err)

    });
    }).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
    });



