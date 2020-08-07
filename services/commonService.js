(function () {
    'use strict';

    var controller = function () {};
    var crypto = require('crypto'); 
    var config = require('../config/config');
    var q = require('q');
    function encryptPassword(password){
        var cipher = crypto.createCipher('aes-256-ctr', password)
        var crypted = cipher.update(config.secret, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    function decryptPassword(password){ 
        var decipher = crypto.createDecipher("aes-256-ctr", password);
        var decrypted = decipher.update(config.secret, 'utf8', 'hex' ) 
        decrypted+= decipher.final('utf8');

        return decrypted.toString(); 
    }

    
    
    controller.prototype.encryptPassword = encryptPassword;
    controller.prototype.decryptPassword = decryptPassword;
    
    module.exports = new controller();
})();