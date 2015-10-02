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
        if (err) {
            addUser(params, function(err, data) {
                common.db.getItem(params, function(err, response) {
                    return callback(null, response);
                });
            });
        } else {
            response.adjacent = navigation.getAdjacent(response.sector);
            return callback(null, response);
        }
    });
}
