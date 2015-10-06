var async = require('async');
var ports = require('../port');
var common = require('../common');
var gameData = require('../json/game');
var userProfile = require('../userProfile');

module.exports = buy;

function buy(user, callback) {
    var amount = parseInt(user.arg[0]);
    if (user.profile.sector !== gameData.starPort) {
        return callback({
            error: 'Must be at StarPort!',
            code: 'invalidSector'
        });
    } else {
        var checkValid = checkParams(amount, user);
        if (checkValid.error) {
            return callback(checkValid);
        }

        var userParam = {
            username: user.username,
            holds: amount + user.profile.holds,
            currency: parseInt(user.profile.currency) - (amount * gameData.holdPrice),
        };
        userProfile.updateHolds(userParam, function(err, data) {
            callback(err, buildResponse(amount, userParam));
        });
    }

}

function checkParams(amount, user) {
    if (amount * gameData.holdPrice > user.profile.currency) {
        return {
            error: 'Not enough money. Total cost: $' + (amount * gameData.holdPrice) + ' | Current: $' + user.profile.currency,
            code: 'insufficientFunds'
        };
    }
    return {
        error: false
    };

}

function buildResponse(amount, userParam) {
    var totalPrice = common.moneyFormat(parseInt(amount * gameData.holdPrice));
    var response = 'Purchase successful!';
    response += '\n```';
    response += '\nPurchased ' + amount + ' holds for $' + totalPrice;
    response += '\n```';
    return response;
}
