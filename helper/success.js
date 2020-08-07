
(function () {
    'use strict';
    var controller = function () {};
    controller.prototype.success = function (req, res, next) {
        var statusCode = req.statusCode || res.statusCode || 200;
        res.json(req.data);
    }
    module.exports = new controller();
})();