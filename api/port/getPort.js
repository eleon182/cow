// 3rd party libraries
var common = require('../common');
var ports = require('../json/ports');
var materials = require('../json/materials');

var table = 'cow-ports';
var averageStock = 2000;

module.exports = getPort;

function getPort(data, callback) {
    var params = {
        TableName: table,
        Key: {
            sector: {
                "S": data.sector.toString()
            }
        }
    };
    common.db.getItem(params, function(err, results) {
        var response = ports[data.sector];
        if (results) {
            response.currentStock = results.currentStock;
            response.price = averageStock / parseInt(results.currentStock) * materials[response.sell || response.buy].unitPrice;
        }

        callback(err, response);
    });
}
