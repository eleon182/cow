var async = require('async');

var userProfile = require('../userProfile');
var shipTypes = require('../json/shipTypes');
var port = require('../port');
var gameData = require('../json/game');

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
    response += '\n\n     Fuel remaining: ' + data.profile.fuel;
    response += '\n```';
    return response;
}

function buildSectorDisplay(val, input) {
    var response = '';
    response += '\n' + val + ': ';
    if (input[1][val].length > 0) {
        input[1][val].forEach(function(current){
            response += '\n     ' + current.username + ' (Ship: ' + shipTypes[current.shipCode].name + ' class ' + shipTypes[current.shipCode].class+ ' | Fighters: ' + current.fighters + ' | Shields: ' + current.shields + ')';

        });
    }
    if (input[0][val]) {
        response += '\n     Port type: ' + input[0][val].type + '(' + input[0][val].code + ') | ' + input[0][val].display + ' | Current Stock: '+ input[0][val].stock+ ' | Unit Price: $' + input[0][val].price.toFixed(2);
    }
    if(gameData.starPort == val){
        response += '\n     Port type: StarPort | Fighter price: $' + gameData.fighterPrice + ' | Shield price: $' + gameData.shieldPrice + ' | Cargo hold price: $' + gameData.holdPrice;
    }
    return response;
}

