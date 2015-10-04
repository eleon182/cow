var common = require('../common');
var navigation = require('../navigation');

module.exports = scanSector;

var table = 'cow-user-profile';

function scanSector(data, callback) {
    scanAdjacent(data, function(err, output) {
        return callback(null, output);
    });
}

function scanAdjacent(data, callback) {
    var params = {
        TableName: table
    };
    common.db.scan(params, function(err, response) {
        var output = {};
        data.profile.adjacent.forEach(function(val) {
            output[val] = findUsers(val, response);
        });
        output[data.profile.sector] = findUsers(data.profile.sector, response);
        callback(null, output);
    });
}

function findUsers(sector, users) {
    var response = null;
    users.forEach(function(val) {
        if (val.sector == sector) {
            response = val;
        }
    });
    return response;
}
