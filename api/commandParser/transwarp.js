var userProfile = require('../userProfile');
var navigation = require('../navigation');
var scanSector = require('./scanSector');
var navigationPath = require('../json/navigation');

module.exports = transwarp;

function transwarp(input, callback) {
    var params = {
        start: input.profile.sector,
        end: input.arg[0]
    };
    if (input.profile.fuel - 3 * (navigation.getPath(params).length - 1) <= 0) {
        return callback({
            error: 'Not enough fuel',
            code: 'insufficientFuel'
        });
    } else if (params.start == params.end) {
        return callback({
            error: 'That is the current sector!',
            code: 'currentSector'
        });
    } else if (parseInt(input.sector) >= navigationPath.length || parseInt(input.sector) < 1) {
        return callback({
            error: 'Valid sectors: 1-' + (navigationPath.length - 1),
            code: 'invalidSector'
        });
    } else {
        input.sector = input.arg[0];
        userProfile.updateSector(input, function(err, inner) {
            input.fuel = input.profile.fuel - 3 * (navigation.getPath(params).length - 1);
            input.profile.fuel = input.fuel;
            userProfile.updateFuel(input, function(err, inner) {
                userProfile.getUser(input, function(err, inner2) {
                    input.profile.sector = params.end;
                    scanSector(input, function(err, data){
                        callback(null, buildSlackResponse(inner2)+data);
                    });
                });
            });
        });
    }
}

function buildSlackResponse(input) {
    var response = 'Transwarp successful';
    response += '\n```';
    response += '\nUser: ' + input.username;
    response += '\nSector: ' + input.sector;
    response += '\nAdjacent sectors: ' + input.adjacent;
    response += '\n```\n';
    return response;
}
