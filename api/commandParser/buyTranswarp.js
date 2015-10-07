var async = require('async');
var ports = require('../port');
var common = require('../common');
var gameData = require('../json/game');
var shipTypes = require('../json/shipTypes');
var userProfile = require('../userProfile');

module.exports = buyTranswarp;

function buyTranswarp(user, callback) {
    var amount = parseInt(user.arg[0]);
    if (user.profile.sector !== gameData.starPort) {
        return callback({
            error: 'Must be at StarPort!',
            code: 'invalidSector'
        });
    } else if (amount > (shipTypes[user.profile.shipCode].maxFighters - user.profile.fighters)) {
        return callback({
            error: 'Above max fighters: ' + shipTypes[user.profile.shipCode].maxFighters,
            code: 'aboveMaxFighters'
        });
    } else {
        var checkValid = checkParams(amount, user);
        if (checkValid.error) {
            return callback(checkValid);
        }

        var userParam = {
            username: user.username,
            fighters: amount + user.profile.fighters,
            currency: parseInt(user.profile.currency) - (amount * gameData.fighterPrice),
        };
        userProfile.updateFighters(userParam, function(err, data) {
            callback(err, buildResponse(amount, userParam));
        });
    }

}

function checkParams(amount, user) {
    if (amount * gameData.fighterPrice > user.profile.currency) {
        return {
            error: 'Not enough money. Total cost: $' + (amount * gameData.fighterPrice) + ' | Current: $' + user.profile.currency,
            code: 'insufficientFunds'
        };
    }
    return {
        error: false
    };

}

function buildResponse(amount, userParam) {
    var totalPrice = common.moneyFormat(parseInt(amount * gameData.fighterPrice));
    var response = 'Purchase successful!';
    response += '\n```';
    response += '\nPurchased ' + amount + ' fighters for $' + totalPrice;
    response += '\n```';
    return response;
}
