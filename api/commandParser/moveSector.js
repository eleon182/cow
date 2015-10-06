var userProfile = require('../userProfile');
var scanSector = require('./scanSector');
var navigationPath = require('../json/navigation');

module.exports = moveSector;

function moveSector(input, callback) {
    if (input.profile.adjacent.indexOf(parseInt(input.arg[0])) < 0) {
        return callback({
            error: 'Please select an adjacent sector: ' + input.profile.adjacent,
            code: 'notAdjacentSector'
        });
    } else if (input.profile.sector == input.sector) {
        return callback({
            error: 'That is the current sector!',
            code: 'currentSector'
        });
    } else if (input.profile.fuel <= 0) {
        return callback({
            error: 'Not enough fuel',
            code: 'insufficientFuel'
        });
    } else if (parseInt(input.sector) >= navigationPath.length || parseInt(input.sector) < 1) {
        return callback({
            error: 'Valid sectors: 1-' + (navigationPath.length - 1),
            code: 'invalidSector'
        });
    } else {
        input.sector = input.arg[0];
        userProfile.updateSector(input, function(err, inner) {
            input.fuel = input.profile.fuel - 1;
            userProfile.updateFuel(input, function(err, inner) {
                userProfile.getUser(input, function(err, inner2) {
                    input.profile.sector = input.arg[0];
                    scanSector(input, function(err, data){
                        callback(null, buildSlackResponse(inner2)+data);
                    });
                });
            });
        });
    }
}

function buildSlackResponse(input) {
    var response = 'Move successful';
    response += '\n```';
    response += '\nUser: ' + input.username;
    response += '\nSector: ' + input.sector;
    response += '\nAdjacent sectors: ' + input.adjacent;
    response += '\n```\n';
    return response;
}
