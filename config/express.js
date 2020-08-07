var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config');
var session = require('express-session');
var busboy = require('connect-busboy');

module.exports = function () {

    var app = express();

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token, mode,embeddedToken,authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Expose-Headers', 'totalRecords');
        // res.writeHead(200, {"Content-Type": "application/json"});
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
        } else {
            next();
        }
    });
    app.use(busboy());
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './views');
    app.set('view engine', 'ejs');

    app.use(passport.initialize())
    app.use(passport.session())

    require('../routes/index')(app);

    app.use(express.static('./files'));
    return app;
}

