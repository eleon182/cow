var common = require('../common');
var lo = require('lodash');

module.exports = updateGoods;

var table = 'cow-user-profile';

function updateGoods(data, callback) {
    var key = {
        username: {
            'S': data.username
        },
    };
    var expression = 'set ' + (data.sell || data.buy) + '= :val1, currency = :val2';
    var values = {
        ':val1': {
            'N': data.amount.toString()
        },
        ':val2': {
            'N': data.currency.toString()
        }
    };
    if (data.holds !== null && data.holds !== undefined && !lo.isNaN(data.holds)) {
        expression += ', holds = :val3';
        values[':val3'] = {
            'N': data.holds.toString()
        };
    }

    var params = {
        TableName: table,
        Key: key,
        UpdateExpression: expression,
        ExpressionAttributeValues: values
    };

    common.db.updateItem(params, callback);
}
