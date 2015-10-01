// 3rd party libraries
var q = require('q');
var async = require('async');
var bcrypt = require('bcrypt');
var lo = require('lodash');
var debug = require('debug')('main');
var common = require('../common');

module.exports = validate;

var table = 'cow-user-security';

function validate(data, callback) {
    if (!(data.username && data.password)) {
        callback({
            code: 'missingFields',
            description: 'Required fields: username, password'
        }, null);
    } else {
        var key = {
            username: {
                "S": data.username
            }
        };
        common.db.getItem(key, table, function(err, response) {
            if (err) {
                return callback({
                    code: 'invalidCredentials',
                    description: 'User credentials do not match'
                }, null);
            } else {
                if (bcrypt.compareSync(response.password, data.password)) {
                    return callback(null, null);
                } else {
                    return callback({
                        code: 'invalidCredentials',
                        description: 'User credentials do not match'
                    }, null);
                }
            }
        });
    }
}
