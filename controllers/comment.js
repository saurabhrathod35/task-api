(function () {
    'use strict';
    var crud = require('../helper/crud');
    var mongoose = require('mongoose');
    var Comment = mongoose.model('comment');
    var express = require('express');

    var apiRoutes = express.Router();

    var controller = function () { };

    function list(req, res, next) {
        crud.list(Comment, req.options, req.body, function (err, data) {
            if (err) {
                return next(err);
            }
            req.data = data;
            next();
        });
    }

    function create(req, res, next) {
        crud.create(Comment, req.body, req, function (err, data) {
            if (err) {
                next(err);
            } else {
                req.data = data;
                next();
            }
           
        });
    }

    function getById(req, res, next) {
        crud.one(Comment, req.params.id, {}, function (err, data) {
            if (err) {
                next(err);
            } else {
                req.data = data;
                next();
            }
        });


    }

    function update(req, res, next) {
        var query = { _id: mongoose.Types.ObjectId(req.params.id) }
        crud.update(Comment,req.queryOptions || query, req.body, req, function (err, data) {
            if (err) {
                next(err);
            } else {
                req.data = data;
                next();
            }
        });
    }

    function remove(req, res, next) {
        var query = { _id: mongoose.Types.ObjectId(req.params.id) }
        crud.remove(Comment, query, {}, function (err, data) {
            if (err) {
                next(err);
            } else {
                req.data = data;
                next();
            }
        });
    }

 

    apiRoutes.use('/wit_sdn', function () {

    })

    controller.prototype.list = list;
    controller.prototype.create = create;
    controller.prototype.getById = getById;
    controller.prototype.update = update;
    controller.prototype.remove = remove;
    controller.prototype.router = apiRoutes;
    module.exports = new controller();
})();