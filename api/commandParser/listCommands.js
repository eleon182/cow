var commandList = require('../json/commandList');
var port = require('../port');
var userProfile = require('../userProfile');
var async = require('async');
var gameData = require('../json/game');

module.exports = listCommands;

function listCommands(data, mainCallback) {
    async.parallel([
            function(callback) {
                port.getPort(data.profile, function(err, response) {
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
            mainCallback(err, buildResponse(data, response, commandList));
        });
}

function buildResponse(user, data, input) {
    console.log(user, data[1])
    if(!data[0]) data[0] = {};
    var response = 'Command List';
    response += '\n```';
    for (var key in input) {
        if((!input[key].starPort || user.profile.sector === gameData.starPort)&&
            (!input[key].sellPort || data[0].sell) &&
            (!input[key].buyPort || data[0].buy) &&
            (!input[key].adjacentShip || data[1][user.profile.sector].length > 1)) {
            response += '\n(' + key + ') ' + input[key].description;
        }
    }
    response += '\n```';
    return response;
}
