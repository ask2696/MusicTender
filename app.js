// Import modules
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLib = require('./lib/passport.lib'); // Import passport library

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MusicTender');

var app = express();
// Logger
app.use(logger('dev'));
// set views and view engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// App Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressSession({secret: 'secret of music'}));
// Configure passport
app.use(passport.initialize());
app.use(passport.session());
passportLib.passportAuthInit(passport);

// Import routes
var index = require('./routes/index');
var admin = require('./routes/admin');

app.use('/', index);
app.use('/admin', admin);

app.listen(3000, function() {
    console.log('Server Running on Port 3000');
});
module.exports = app;
