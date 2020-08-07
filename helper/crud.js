(function () {
    'use strict';


    var crud = function () { };
    var _ = require('lodash');

    function list(entity, options, body, cb) {
        options = options || {};

        entity.count(options.where, function (err, count) {
            if (err) {
                cb(err, count);
            } else {
                entity.find(options.where)
                    .select(options.select)
                    .sort(options.sort)
                    .skip(((options.page || 1) - 1) * options.pagesize)
                    .limit(options.pagesize)
                    .populate(options.populate)
                    .exec(function (err, data) {
                        var obj = {
                            data: data,
                            count: count
                        }
                        cb(err, obj);
                    });
            }
        })
    }

    function one(entity, options, query, cb) {
        options = options || {};
        entity.findById(options)
            .select(options.select)
            .populate(query.populate).exec(function (err, data) {
                cb(err, data);
            })
    }

    function find(entity, options, cb) {
        entity.find(options.where)
            .select(options.select)
            .populate(options.populate).exec(function (err, data) {
                cb(err, data);
            })
    }


    function create(entity, body, req, cb) {
        // options = options || {};
        body.isActive = true;
        // body = _.omit(body,'_id');
        body.createdBy = req.userId;
        body.modifiedBy = req.userId;
        entity.create(body, function (err, data) {
            cb(err, data);
        });
    }

    function update(entity, options, body, req, cb) {
        body.createdBy = req.userId;
        body.modifiedBy = req.userId;
        options = options || {};
        entity.findOneAndUpdate(options, body, { upsert: true }, function (err, data) {
            if (!err) {
                var query = {where:options}
                find(entity,query,function (errr,_data) {
                    cb(errr, _data[0]);
                })
            }
        });
    }


    function remove(entity, options, body, cb) {
        options = options || {};
        entity.findOneAndRemove(options, function (err, data) {
            cb(err, data);
        });
    }
    function removeMany(entity, options, body, cb) {
        options = options || {};
        entity.remove(options, function (err, data) {
            cb(err, data);
        });
    }
    crud.prototype.list = list;
    crud.prototype.one = one;
    crud.prototype.find = find;
    crud.prototype.create = create;
    crud.prototype.update = update
    crud.prototype.remove = remove;
    crud.prototype.removeMany = removeMany;
    module.exports = new crud();
})();
