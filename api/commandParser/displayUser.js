var userProfile = require('../userProfile');

module.exports = displayUser;

function displayUser(arg, callback){
    userProfile.getUser(arg, function(err, response){
        if(err){
            return callback({
                error: 'User not found',
                code: 'notFound'
            });
        }
        else {
            callback(null, buildSlackResponse(response));
        }
    });
}

function buildSlackResponse(input){
    var response = 'User Information';
    response += '\n```';
    response += '\nUser: ' + input.username;
    response += '\nFighters: ' + input.fighters;
    response += '\nShields: ' + input.shields;
    response += '\nCurrency: ' + input.currency;
    response += '\nFuel: ' + input.fuel;
    response += '\nAvailable holds: ' + input.holds;
    response += '\nCreate date: ' + new Date(input.createDate).toDateString();
    response += '\nSector: ' + input.sector;
    response += '\nAdjacent sectors: ' + input.adjacent;
    response += '\n```';
    return response;
}
