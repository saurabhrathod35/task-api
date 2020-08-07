(function () {
    'use strict';
    var crud = require('../helper/crud');
    var mongoose = require('mongoose');
    var SinglePost = mongoose.model('singlepost');
    var express = require('express');

    var apiRoutes = express.Router();

    var controller = function () { };

    function list(req, res, next) {
        crud.list(SinglePost, req.options, req.body, function (err, data) {
            if (err) {
                return next(err);
            }
            req.data = data;
            next();
        });
    }

    function create(req, res, next) {
        crud.create(SinglePost, req.body, req, function (err, data) {
            if (err) {
                next(err);
            } else {
                req.data = data;
                next();
            }
           
        });
    }

    function getById(req, res, next) {
        crud.one(SinglePost, req.params.id, {}, function (err, data) {
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
        crud.update(SinglePost,req.queryOptions || query, req.body, req, function (err, data) {
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
        crud.remove(SinglePost, query, {}, function (err, data) {
            if (err) {
                next(err);
            } else {
                req.data = data;
                next();
            }
        });
    }

    function afterPost(){
 
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