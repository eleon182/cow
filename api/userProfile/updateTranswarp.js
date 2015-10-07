var common = require('../common');
var lo = require('lodash');

module.exports = updateTranswarp;

var table = 'cow-user-profile';

function updateTranswarp(data, callback) {
    var key = {
        username: {
            'S': data.username
        },
    };
    var expression = 'set transwarp = :val1, currency = :val2';
    var values = {
        ':val1': {
            'B': data.holds.toString()
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
