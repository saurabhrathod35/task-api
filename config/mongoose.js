﻿(function () {
    'use strict';

    var config = require('./config.js'),
        mongoose = require('mongoose'),
        fs = require('fs');
    //autoIncrement = require('mongoose-auto-increment');

    module.exports = function () {
        var dbUrl
        if(config.mongoDb.username){
	    
            dbUrl = 'mongodb://'+config.mongoDb.username +":"+config.mongoDb.password+'@'+ config.mongoDb.host + ':' + config.mongoDb.port + '/' + config.mongoDb.dbname;
	console.log(dbUrl);       

 } else {
             dbUrl = 'mongodb://'+ config.mongoDb.host + ':' + config.mongoDb.port + '/' + config.mongoDb.dbname;
        }
        
         var   db = mongoose.connect(dbUrl
           , { 
                useNewUrlParser: true,
                 useUnifiedTopology: true ,
                 useCreateIndex: true,
                }
        );
        //autoIncrement.initialize(db);

        // When successfully connected
        mongoose.connection.on('connected', function () {
            console.log('Mongoose default connection open to ' + dbUrl);
        });

        // If the connection throws an error
        mongoose.connection.on('error', function (err) {
            console.log('Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });

        fs
            .readdirSync(__dirname + "/../models")
            .filter(function (file) {
                return (file.indexOf(".") !== 0) && (file !== "index.js");
            })
            .forEach(function (file) {
                require('../models/' + file);
            });

        return db;
    };
})();
