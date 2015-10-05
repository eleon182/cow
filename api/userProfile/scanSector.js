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
    var currentSector;
    common.db.scan(params, function(err, response) {
        var output = {};
        data.profile.adjacent.forEach(function(val) {
            currentSector = findUsers(val, response);
            output[val] = currentSector;
        });
        output[data.profile.sector] = findUsers(data.profile.sector, response);
        callback(null, output);
    });
}

function initializeOutput(sectors, current) {
    var response = {};
    sectors.forEach(function(val) {
        response[val] = [];
    });
    response[current] = [];
    return response;
}

function findUsers(sector, users) {
    var response = [];
    users.forEach(function(val) {
        if (val.sector == sector) {
            response.push(val);
        }
    });
    return response;
}
