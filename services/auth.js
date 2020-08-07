(function () {
    'use strict'; 
    var config = require('../config/config');
    var mongoose = require('mongoose');
    var Entity = mongoose.model('User'); 
    var _ = require('lodash');
    var jwt = require('jsonwebtoken'); 
    var controller = function () { };
    var commonService = require('./commonService');

    controller.prototype.login = function (req, res, next) {

        req.body.password = commonService.encryptPassword(req.body.password);
        req.body.username = req.body.username.toLowerCase();
        Entity.findOne({
            username: req.body.username,
            password: req.body.password,
            isActive: true
        }, function (err, data) {
            if (err) {
                next(err)
            } else {
                if (!data) {
                    return res.status(403).send({
                        message: "Invalid Username or Password."
                    })
                } 
                    var tokenData = _.pick(data._doc, ['_id', 'username'])  
                    var shortUser = _.pick(data._doc, ['username']);
                    var token = jwt.sign(tokenData, config.secret, { expiresIn: config.tokenExpires });
                    return res.status(200).json({
                        access_token: token,
                        user: shortUser,
                        message: 'Successfully signed'
                    });  
            }
        })

    }

    module.exports = new controller();
})();
