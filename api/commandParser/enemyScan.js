var async = require('async');

var userProfile = require('../userProfile');
var shipTypes = require('../json/shipTypes');
var port = require('../port');
var gameData = require('../json/game');

module.exports = enemyScan;

function enemyScan(data, callback) {
    userProfile.scan(data, function(err, response) {
        callback(null, buildResponse(response));
    });
}

function buildResponse(users) {
    var response = 'Enemy scan complete';
    response += '\n```';
    users.forEach(function(val) {
        response += buildUserDisplay(val);
    });
    response += '\n```';
    return response;
}

function buildUserDisplay(user) {
    var response = '';
    if (user.fighters > 0) {
        response += '\nUsername: ' + user.username;
        response += ' | Ship: ' + shipTypes[user.shipCode].name + ' class ' + shipTypes[user.shipCode].class + ' | Sector: ' + user.sector + ' | Fighters: ' + user.fighters + ' | Shields: ' + user.shields;
    }
    return response;
}
