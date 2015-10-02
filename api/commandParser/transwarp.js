var userProfile = require('../userProfile');
var navigation = require('../navigation');

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
    } else {
        input.sector = input.arg[0];
        userProfile.updateSector(input, function(err, inner) {
            input.fuel = input.profile.fuel - 3 * (navigation.getPath(params).length - 1);
            userProfile.updateFuel(input, function(err, inner) {
                userProfile.getUser(input, function(err, inner2) {
                    callback(null, buildSlackResponse(inner2));
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
    response += '\n```';
    return response;
}
