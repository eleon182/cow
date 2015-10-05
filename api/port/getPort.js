// 3rd party libraries
var common = require('../common');
var ports = require('../json/ports');

var table = 'cow-ports';

module.exports = getPort;

function getPort(data, callback) {
    var params = {
        TableName: table,
        Key: {
            sector: {
                "S": data.sector
            }
        }
    };
    common.db.getItem(params, function(err, results) {
        var response = ports[data.sector];
        response.currentStock = results.currentStock;

        callback(err, response);
    });
}
