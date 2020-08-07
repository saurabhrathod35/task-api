(function () {
    'use strict';
    var config = require('../config/config');
    var jwt = require('jsonwebtoken');
    var controller = function () { };
    function verifyToken(req, res, next) {

        var token = req.get("x-access-token");
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.userId = decoded._id;
                req.username = decoded.username;
                next();
            }
        })


    }

    controller.prototype.verifyToken = verifyToken;
    module.exports = new controller();
})();