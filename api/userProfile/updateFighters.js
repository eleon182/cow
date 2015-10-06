var common = require('../common');
var lo = require('lodash');

module.exports = updateFighters;

var table = 'cow-user-profile';

function updateFighters(data, callback) {
    var key = {
        username: {
            'S': data.username
        },
    };
    var expression = 'set fighters = :val1, currency = :val2';
    var values = {
        ':val1': {
            'N': data.fighters.toString()
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
