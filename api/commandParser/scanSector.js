var async = require('async');

var userProfile = require('../userProfile');
var port = require('../port');

module.exports = scanSector;

function scanSector(data, mainCallback) {

    async.parallel([
            function(callback) {
                port.portScan(data, function(err, response) {
                    callback(null, response);
                });

            },
            function(callback) {
                userProfile.scanSector(data, function(err, response) {
                    callback(null, response);
                });
            }
        ],
        function(err, response) {
            mainCallback(err, buildResponse(data, response));
        });
}

function buildResponse(data, input) {
    var response = 'Scan complete';
    response += '\n```';
    data.profile.adjacent.forEach(function(val) {
        response += buildSectorDisplay(val, input);
    });

    response += buildSectorDisplay(data.profile.sector, input);
    response += '\n```';
    return response;
}

function buildSectorDisplay(val, input) {
    var response = '';
    response += '\n' + val + ': ';
    if (input[1][val]) {
        response += '\n     ' + input[1][val].username + ' (Fighters: ' + input[1][val].fighters + ' Shields: ' + input[1][val].shields + ')';
    }
    if (input[0][val]) {
        response += '\n     Port type: ' + input[0][val].type + '(' + input[0][val].code + ') | ' + input[0][val].display + ' | Current Stock: '+ input[0][val].stock+ ' | Unit Price: $' + input[0][val].price.toFixed(2);
    }
    return response;
}

