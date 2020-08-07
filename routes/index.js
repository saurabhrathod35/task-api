/**
 * here we are crating routes on the basisi of our controller created.
 * all extra routes we are moving to other files to remove complexity
 * 
 */
(function () {
    'use strict';
    var express = require('express');
    var fs = require('fs');
    var queryBuilder = require('../helper/queryBuilder');
    var helper = require('../helper/success');
    var validateToken = require('../helper/validateToken');
    var controller = {};
    var config = require('../config/config');
    fs
        .readdirSync(__dirname + "/../controllers")
        .filter(function (file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function (file) {
            controller[file.split('.')[0]] = require(__dirname + "/../controllers/" + file);
        });

 

    module.exports = function (app) {
        var apiRoutes = express.Router();
        fs.readdirSync(__dirname + "/../controllers")
            .filter(function (file) {
                return (file.indexOf(".") !== 0) && (file !== "index.js");
            })
            .forEach(function (file) {
                var filename = file.split('.')[0];
                console.log('/' + filename);
                //check if the controller is pesent
                if (controller[filename] && config.providedModules[filename.toLowerCase()]) {
                    apiRoutes.route('/' + filename)
                        .get(
                            // validateToken.verifyToken,
                            controller[filename].beforeGet || safeCallBack,
                            queryBuilder.queryBuilder,
                            controller[filename].list,
                            controller[filename].afterGet || safeCallBack,
                            helper.success
                        )
                        .post(
                            validateToken.verifyToken,
                            controller[filename].beforePost || safeCallBack,
                            queryBuilder.queryBuilder,
                            controller[filename].create,
                            controller[filename].afterPost || safeCallBack,
                            helper.success
                        );


                    apiRoutes.route('/' + filename + '/:id')
                        .get(
                            validateToken.verifyToken,
                            controller[filename].beforeGetById || safeCallBack,
                            queryBuilder.queryBuilder,
                            controller[filename].getById,
                            controller[filename].afterGet || safeCallBack,
                            helper.success
                        )

                        .patch(
                            validateToken.verifyToken,
                            controller[filename].beforePatch || safeCallBack,
                            controller[filename].update,
                            controller[filename].afterPatch || safeCallBack,
                            helper.success
                        )

                        .delete(
                            validateToken.verifyToken,
                            controller[filename].beforeDelete || safeCallBack,
                            controller[filename].remove,
                            controller[filename].afterDelete || safeCallBack,
                            helper.success
                        );

                    if (controller[filename].router) {
                        apiRoutes.use(controller[filename].router);
                    }
                } else {
                    console.log(filename + " --- NO controller created");
                }
            });

        function safeCallBack(req, res, next) {
            next();
        }
        //other routes we will specify here.      
        require('./auth.js')(app);
        require('../seed/index.js')(app);
        app.use('/api', apiRoutes);
        app.post('/file', function (req, res, next) {
            var sequenceId;
            req.pipe(req.busboy);
            req.busboy.on('file', function (fieldname, file, filename, encoding, mimeType) {
                var actualFilename = filename;
                var splitedFilename = actualFilename.split('.');
                var extension = splitedFilename[splitedFilename.length - 1];
                var filestamp = (new Date()).getTime();

                filename = filestamp + '-' + filename.replace(/[`~!@#$%^&*()_|+\=÷¿?;:'"<>\{\}\[\]\\\/]/gi, '_');
                var filesize = [];
                filename = decodeURI(filename);
                file.on('data', function (data) {
                    filesize.push(data.length);
                });
                //Path where file will be uploaded
                var fstream = fs.createWriteStream(config.filepath + filename);

                file.pipe(fstream);
                fstream.on('close', function () {
                    if (filesize.length) {
                        filesize = filesize.reduce(function (f, n) {
                            return f + n;
                        }, 0);
                        filesize = (filesize / (1024 * 1024)).toFixed(4);
                    }

                    res.status(201).json({ file: filename, size: filesize, actualFilename, mimeType, extension, filestamp, sequenceId });
                });
            }); 
        });

        app.get('/file/:file', function (req, res, next) {
            if (!req.params.file) { 
                res.status(422).json({ 'message': 'file not provided' })
                return;
            } 
            var filename = config.filepath + req.params.file; 
            filename = decodeURI(filename); 
            if (!fs.existsSync(filename)) { 
                res.status(404).json({ 'message': 'file not found' })
                return;
            }
            var fileToShow = filename.substring(filename.lastIndexOf('/') + 15, filename.length);
            res.download(filename, fileToShow)
        })
        app.get('/', function (req, res, next) {
            return res.json({ message: "Hey!" })
        })
    }

})();

