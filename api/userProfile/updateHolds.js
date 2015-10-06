var common = require('../common');
var lo = require('lodash');

module.exports = updateHolds;

var table = 'cow-user-profile';

function updateHolds(data, callback) {
    var key = {
        username: {
            'S': data.username
        },
    };
    var expression = 'set holds = :val1, currency = :val2';
    var values = {
        ':val1': {
            'N': data.holds.toString()
        },
        ':val2': {
            'N': data.currency.toString()
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
