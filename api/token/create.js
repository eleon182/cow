var common = require('../common');
var q = require('q');
var debug = require('debug')('main');
var uuid = require('node-uuid');

module.exports = create;

var table = 'cow-token';

function create(data) {
    var deferred = q.defer();
    debug('create: ' + JSON.stringify(data));
    var token = uuid.v1();
    var item = {
        username: {
            'S': data.username
        },
        token: {
            'S': token
        },
        createDate: {
            'S': new Date().toISOString()
        },
    };
    common.db.putItem(item, table).then(function(val) {
            deferred.resolve({
                token: token
            });
        },
        function(err) {
            deferred.reject(err);
        });
    return deferred.promise;
}
