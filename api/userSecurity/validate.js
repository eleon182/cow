// 3rd party libraries
var q = require('q');
var async = require('async');
var bcrypt = require('bcrypt');
var lo = require('lodash');
var debug = require('debug')('main');
var common = require('../common');

module.exports = validate;

var table = 'cow-user-security';

function validate(params) {
    var deferred = q.defer();
    if (!(params.username && params.password)) {
        deferred.reject({
            code: 'missingFields',
            description: 'Required fields: username, password'
        });
    } else {
        var key = {
            username: {
                "S": params.username
            }
        };
        common.db.getItem(key, table).then(function(data) {
            if (bcrypt.compareSync(params.password, data.password)) {
                deferred.resolve();
            } else {
                deferred.reject({
                    code: 'invalidCredentials',
                    description: 'User credentials do not match'
                });
            }
        }, function(err) {
            deferred.reject({
                code: 'invalidCredentials',
                description: 'User credentials do not match'
            });
        });
    }
    return deferred.promise;
}
