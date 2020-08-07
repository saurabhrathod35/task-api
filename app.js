var config = require('./config/config');
process.env.port = process.env.port || config.appPort;

var mongoose = require('./config/mongoose.js');
var express = require('./config/express.js');
mongoose.Promise = global.Promise;
var db = mongoose();
var app = express();

module.exports = app;
