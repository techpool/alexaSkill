var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var alexa = require("alexa-app");


var routes = require('./routes/index');
var users = require('./routes/users');

var express_app = express();

var app = new alexa.app("nodealexa");
require('./alexaapps/vision/index.js')(app)

// setup the alexa app and attach it to express before anything else 
app.express({ expressApp: express_app });

// view engine setup
express_app.set('views', path.join(__dirname, 'views'));
express_app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//express_app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
express_app.use(logger('dev'));
express_app.use(bodyParser.json());
express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(cookieParser());
express_app.use(express.static(path.join(__dirname, 'public')));

express_app.use('/', routes);
express_app.use('/users', users);

// catch 404 and forward to error handler
express_app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (express_app.get('env') === 'development') {
    express_app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
express_app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = express_app;
