var userProfile = require('../userProfile');

module.exports = displayUser;

function displayUser(data, callback) {

    userProfile.getUserStats(data, function(err, response){
        callback(null, buildSlackResponse(response));
    });
}

function buildSlackResponse(input) {

    var response = 'Game Statistics';
    response += '\n```';
    response += '\nTotal sectors: ' + input.sectorStats.sectors;
    response += '\nMost hops: ' + input.sectorStats.maxHops;
    response += '\n=============================';
    response += '\nTotal ports: ' + input.portStats.count;
    response += '\n----------------------------';
    response += '\nPort sells fuel: ' + input.portStats.sellFuel;
    response += '\nPort buys fuel: ' + input.portStats.buyFuel;
    response += '\n----------------------------';
    response += '\nPort sells iron: ' + input.portStats.sellIron;
    response += '\nPort buys iron: ' + input.portStats.buyIron;
    response += '\n----------------------------';
    response += '\nPort sells titanium: ' + input.portStats.sellTitanium;
    response += '\nPort buys titanium: ' + input.portStats.buyTitanium;
    response += '\n=============================';
    response += '\nLeaderboards';
    response += '\n----------------------------';
    response += '\nMost currency: ' + input.topPlayer.currency.username + ' ('+ input.topPlayer.currency.currency + ')';
    response += '\nMost fighters: ' + input.topPlayer.fighters.username + ' ('+ input.topPlayer.fighters.fighters + ')';
    response += '\nMost shields: ' + input.topPlayer.shields.username + ' ('+ input.topPlayer.shields.shields +')';
    response += '\n```';
    console.log(input);
    return response;
}
