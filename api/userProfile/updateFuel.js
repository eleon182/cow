var common = require('../common');

module.exports = updateFuel;

var table = 'cow-user-profile';

function updateFuel(data, callback) {
    var key = {
        username: {
            'S': data.username
        },
    };
    var expression = "set fuel= :val1";
    var values = {
        ':val1': {
            'S': data.fuel.toString()
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
