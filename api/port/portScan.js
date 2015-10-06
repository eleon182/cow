var common = require('../common');
var navigation = require('../navigation');
var ports = require('../json/ports');
var materials = require('../json/materials');

module.exports = portScan;

var table = 'cow-user-profile';
var averageStock = 2000;

function portScan(data, callback) {
    scanAdjacent(data, function(err, output) {
        return callback(null, output);
    });
}

function scanAdjacent(data, callback) {
    var params = {
        TableName: table
    };
    var output = {};
    data.profile.adjacent.forEach(function(val) {
        output[val] = findPort(val);
    });
    output[data.profile.sector] = findPort(data.profile.sector);
    getPortStock(getPortList(output), function(err, results) {
        callback(null, combineResults(results, output));
    });
}

function calculatePrice(input) {
    var response = '';
    if (input.stock === '0') {
        response = 0;
    } else {
        for (var key in input) {
            if (input[key] === 'b' || input[key] === 's') {
                response = averageStock / parseInt(input.stock) * materials[key].unitPrice;
            }
        }
    }
    return response;
}

function combineResults(stock, output) {
    stock.forEach(function(val) {
        output[val.sector].stock = val.currentStock;
    });
    for (var key in output) {
        if (output[key]) {
            output[key].price = calculatePrice(output[key]);
        }
    }
    return output;
}

function getPortList(data) {
    var response = [];
    for (var key in data) {
        if (data[key]) {
            response.push(key);
        }
    }
    return response;
}

function findPort(sector) {
    var response = '';
    if (ports[sector]) {
        response = ports[sector];
    }
    return response;
}

function getPortStock(sectors, callback) {
    var keys = [];
    sectors.forEach(function(val) {
        keys.push({
            sector: {
                "S": val
            }
        });
    });
    var params = {
        RequestItems: {
            'cow-ports': {
                Keys: keys
            }
        }
    };
    common.db.batchGetItem(params, function(err, results) {
        callback(err, results);
    });
}
