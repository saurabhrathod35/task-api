(function () {
    'use strict';
    var fs = require('fs'); 

    var seedService = function () { }; 
    // var getModule = require('./getModule');
    function process(app,req,res,next) { 
        fs
            .readdirSync(__dirname + "/")
            .filter(function (file) {
                return (file.indexOf(".") !== 0) && (file !== "index.js");
            })
            .forEach(function (file) {
                console.log(__dirname + "/" + file);
                
                require(__dirname + "/" + file)(app,req,req,next);
            });
    }

    module.exports = function (app) {
        app.post('/initialsetup', function (req, res, next) {
            process(app,req,req,next);
            setTimeout(function(){
                res.json({"message":"intial setup done"})
            },1000)
        }); 
    };
})();   