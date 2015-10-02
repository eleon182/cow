var common = require('../common');
var navigation = require('../navigation');

module.exports = scanSector;

var table = 'cow-user-profile';

function scanSector(data, callback) {
    var params = {
        TableName: table,
        Key: {
            username: {
                "S": data.username
            }
        }
    };
    common.db.getItem(params, function(err, response){
        if(err){
           return callback(err);
        }
        else {
            response.adjacent = navigation.getAdjacent(response.sector);
            scanAdjacent(response, function(err, output){
                return callback(null, output);
            });
        }
    });
}

function scanAdjacent(data, callback){
    var params = {
        TableName: table
    };
    common.db.scan(params, function(err, response){
        var output = {};
        data.adjacent.forEach(function(val){
            output[val] = findUsers(val, response);
        });
        output[data.sector] = findUsers(data.sector, response);
        callback(null,output);
    });
}

function findUsers(sector, users){
    var response = [];
    users.forEach(function(val){
        if(val.sector === sector){
            response.push(val.username);
        }
    });
    return response;
}
