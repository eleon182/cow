var userProfile = require('../userProfile');
var materials = require('../json/materials');
var gameData = require('../json/game');

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
    response += '\nStarPort sector: ' + gameData.starPort;
    response += '\nMost hops: ' + input.sectorStats.maxHops;
    response += '\n=============================';
    response += '\nTotal ports: ' + input.portStats.count;
    response += '\n----------------------------';
    response += '\nPort sells fuel: ' + input.portStats.sellFuel;
    response += '\nPort buys fuel: ' + input.portStats.buyFuel;
    response += '\nAverage fuel price: $' + materials.fuel.unitPrice;
    response += '\n----------------------------';
    response += '\nPort sells iron: ' + input.portStats.sellIron;
    response += '\nPort buys iron: ' + input.portStats.buyIron;
    response += '\nAverage iron price: $' + materials.iron.unitPrice;
    response += '\n----------------------------';
    response += '\nPort sells titanium: ' + input.portStats.sellTitanium;
    response += '\nPort buys titanium: ' + input.portStats.buyTitanium;
    response += '\nAverage titanium price: $' + materials.titanium.unitPrice;
    response += '\n=============================';
    response += '\nLeaderboards';
    response += '\n----------------------------';
    response += '\nMost currency: ' + input.topPlayer.currency.username + ' ($'+ parseInt(input.topPlayer.currency.currency).toFixed(2) + ')';
    response += '\nMost fighters: ' + input.topPlayer.fighters.username + ' ('+ input.topPlayer.fighters.fighters + ')';
    response += '\nMost shields: ' + input.topPlayer.shields.username + ' ('+ input.topPlayer.shields.shields +')';
    response += '\n```';
    return response;
}
