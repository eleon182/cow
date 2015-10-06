var userProfile = require('../userProfile');

module.exports = displayUser;

function displayUser(data, callback) {
    callback(null, buildSlackResponse(data.profile));
}

function buildSlackResponse(input) {
    var response = 'User Information';
    response += '\n```';
    response += '\nUser: ' + input.username;
    response += '\nFighters: ' + input.fighters;
    response += '\nShields: ' + input.shields;
    response += '\nCurrency: $' + parseInt(input.currency).toFixed(2);
    response += '\nFuel: ' + input.fuel + '/'+ input.maxFuel;
    if(input.iron){
        response += '\nIron: ' + input.iron;
    }
    if(input.titanium){
        response += '\nTitanium: ' + input.titanium;
    }
    response += '\nAvailable holds: ' + input.holds;
    response += '\nCreate date: ' + new Date(input.createDate).toDateString();
    response += '\nSector: ' + input.sector;
    response += '\nAdjacent sectors: ' + input.adjacent;
    response += '\n```';
    return response;
}
