var common = require('../common');
var navigation = require('../navigation');
var addUser = require('./addUser');

module.exports = getUser;

var table = 'cow-user-profile';

function getUser(data, callback) {
    var params = {
        TableName: table,
        Key: {
            username: {
                "S": data.username
            }
        }
    };
    common.db.getItem(params, function(err, response) {
        if (err || !response) {
            if (data.noCreate) {
                return callback(err, response);
            } else {
                addUser(data, function(err, data) {
                    common.db.getItem(params, function(err, response) {
                        if (response && response.sector) {
                            response.adjacent = navigation.getAdjacent(response.sector);
                        }
                        return callback(err, response);
                    });
                });
            }
        } else {
            if (response && response.sector) {
                response.adjacent = navigation.getAdjacent(response.sector);
            }
            return callback(null, response);
        }
    });
}
