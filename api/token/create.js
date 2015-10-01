var common = require('../common');
var q = require('q');
var debug = require('debug')('main');
var uuid = require('node-uuid');

module.exports = create;

var table = 'cow-token';

function create(data, callback) {
    debug('create: ' + JSON.stringify(data));
    var token = uuid.v1();
    var params = {
        TableName: table,
        Item: {
            username: {
                'S': data.username
            },
            token: {
                'S': token
            },
            createDate: {
                'S': new Date().toISOString()
            },
        }
    };
    common.db.putItem(params, function(err, data) {
        if (err) {
            return callback(err, data);
        } else {
            return callback(null, {
                token: token
            });
        }
    });
}
