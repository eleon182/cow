var userProfile = require('../userProfile');

module.exports = moveSector;

function moveSector(input, callback) {
    if (response.adjacent.indexOf(parseInt(input.arg[0])) > -1) {
        if (response.fuel <= 0) {
            return callback({
                error: 'Not enough fuel',
                code: 'insufficientFuel'
            });
        } else {
            input.sector = input.arg[0];
            userProfile.updateSector(input, function(err, inner) {
                userProfile.getUser(input, function(err, inner2) {
                    callback(null, buildSlackResponse(inner2));
                });
            });
        }
    } else {
        callback(null, 'Please select an adjacent sector: ' + response.adjacent);
    }
}

function buildSlackResponse(input) {
    var response = 'Move successful';
    response += '\n```';
    response += '\nUser: ' + input.username;
    response += '\nSector: ' + input.sector;
    response += '\nAdjacent sectors: ' + input.adjacent;
    response += '\n```';
    return response;
}
