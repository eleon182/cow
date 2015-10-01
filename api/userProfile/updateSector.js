var common = require('../common');

module.exports = updateSector;

var table = 'cow-user-profile';

function updateSector(data, callback) {
    var key = {
        username: {
            'S': data.username
        },
    };
    var expression = "set sector= :val1";
    var values = {
        ':val1': {
            'S': data.sector
        }
    };

    var params = {
        TableName: table,
        Key: key,
        UpdateExpression: expression,
        ExpressionAttributeValues: values
    };

    common.db.updateItem(params, callback);
}
