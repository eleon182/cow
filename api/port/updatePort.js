var common = require('../common');

module.exports = updatePort;

var table = 'cow-ports';

function updatePort(data, callback) {
    var key = {
        sector: {
            'S': data.sector.toString()
        },
    };
    var expression = "set currentStock= :val1";
    var values = {
        ':val1': {
            'N': data.currentStock.toString()
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
