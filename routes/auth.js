
(function () {
    'use strict';

    //  var user = require('../controllers/user');
    var _ = require('lodash');
    var authService = require('../services/auth');

    module.exports = function (app) {

        app.route('/login')
            .post(authService.login);

    }
})();