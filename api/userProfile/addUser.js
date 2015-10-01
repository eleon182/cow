var common = require('../common');

module.exports = addUser;

var table = 'cow-user-profile';

function addUser(data, callback) {
    var params = {
        TableName: table,
        Item: {
            username: {
                S: data.username
            },
            sector: {
                S: data.sector
            },
            createDate: {
                S: new Date().toISOString()
            }
        }
    };
    common.db.putItem(params, callback);
}
