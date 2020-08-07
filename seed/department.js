(function () {
    'use strict';
    var decorations = require('../data/decoration.json')
    var mongoose = require('mongoose');
    // var Entity = mongoose.model('Department');
    var Product = mongoose.model('Product');
    var Quantity = mongoose.model('Quantity');

    module.exports = function (app) {

        try {
            for (var key in decorations) {

                setTimeout(function () {

                    try {
                        Quantity.find({ productCode: decorations[key].productCode }, function (err, qunatityData) {
                            if (!err) {
                                try {

                                    decorations[key]['quantity'] = qunatityData[0].id;
                                    Product.create(
                                        {
                                            productCode: decorations[key].productCode,
                                            title: decorations[key].title,
                                            HSN_CODE: decorations[key].HSN_CODE,
                                            quantity: decorations[key].quantity,
                                            unitCost: decorations[key].unitCost,
                                            GST: decorations[key].GST,
                                            unitPrice: decorations[key].unitPrice,
                                            category: "5d90a57d2d75b47fde3d9b5d"
                                        },
                                        function (err, data) {
                                            if (err) {
                                                console.log(err, 'product');
                                            } else {
                                                console.log(data, 'product');
                                            }
                                        });
                                } catch (errrrr) {
                                    console.log(err, 'fail to update product');
                                }

                                // } else {

                                // }
                            } else {
                                console.log(err, 'quantity');
                            }
                        })
                    }
                    catch (ee) {
                        console.log(ee, 'product');
                    }
                }, 500)
            }
        } catch (e) {
            console.log(e);
        };

    }
})();
