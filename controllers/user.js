(function () {
    'use strict';
    var crud = require('../helper/crud');
    var mongoose = require('mongoose');
    var Entity = mongoose.model('User');
    var commonService = require('../services/commonService'); 
    var controller = function () { };

    function list(req, res, next) {

        crud.list(Entity, req.options, req.body, function (err, data) {
            if (err) {
                return next(err);
            }
            req.data = data;
            next();
        });

    }

    function create(req, res, next) {
        req.body.password = commonService.encryptPassword(req.body.password);
        req.body.email = req.body.email.toLowerCase();
        crud.create(Entity, req.body, req, function (err, data) {
            if (err) {
                next(err);
            } else {
                req.data = data;
                next();
            }
           
        });
    }

    function getById(req, res, next) {
        crud.one(Entity, req.params.id, {}, function (err, data) {
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
        req.body.password = commonService.encryptPassword(req.body.password);
        req.body.email = req.body.email.toLowerCase();
        crud.update(Entity, query, req.body, req, function (err, data) {
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
        crud.remove(Entity, query, {}, function (err, data) {
            if (err) {
                next(err);
            } else {
                req.data = data;
                next();
            }
        });
    }

    function afterPOst(){
        // Product.aggregate()
    }

    // apiRoutes.use('/wit_sdn', function(){

    // })

    
    controller.prototype.list = list;
    controller.prototype.create = create;
    controller.prototype.getById = getById;
    controller.prototype.update = update;
    controller.prototype.remove = remove;
    module.exports = new controller();
})();