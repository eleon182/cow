var async = require('async');
var ports = require('../port');
var common = require('../common');
var userProfile = require('../userProfile');

module.exports = buy;

function buy(user, callback) {
    var amount = parseInt(user.arg[0]);
    ports.getPort(user.profile, function(err, portData) {
        if (!portData || !portData.sell) {
            return callback({
                error: 'No valid sell port in this sector',
                code: 'invalidPort'
            });
        } else {
            if (amount === 0) {
                amount = smartBuy(user, portData);
                if (amount.error) {
                    return callback(amount);
                }
            }
            amount = parseInt(amount);
            var checkValid = checkParams(amount, user, portData);
            if (checkValid.error) {
                return callback(checkValid);
            }
            var portParam = {
                sector: user.profile.sector,
                currentStock: parseInt(portData.currentStock) - amount
            };
            var newAmount = 0;
            var newHolds = null;
            if (portData.sell === 'fuel') {
                newAmount = parseInt(user.profile.fuel) + amount;
            } else {
                if (user.profile[portData.sell]) {
                    newAmount = parseInt(user.profile[portData.sell]) + amount;
                } else {
                    newAmount = amount;
                }
                newHolds = parseInt(user.profile.holds) - amount;
            }
            var userParam = {
                username: user.username,
                sell: portData.sell,
                amount: newAmount,
                currency: parseInt(user.profile.currency) - (amount * portData.price),
            };
            if (newHolds !== null) {
                userParam.holds = newHolds;
            }
            async.parallel([

                    function(internalCallback) {
                        userProfile.updateGoods(userParam, function(err, data) {
                            internalCallback(err, data);
                        });

                    },
                    function(internalCallback) {
                        ports.updatePort(portParam, function(err, portVal) {
                            internalCallback(null, portVal);
                        });
                    }
                ],
                function(err, response) {
                    callback(err, buildResponse(amount, portData, userParam));
                });
        }
    });

}

function checkParams(amount, user, portData) {
    if (portData.currentStock == '0' || amount > portData.currentStock) {
        return {
            error: 'Insufficient stock. Available stock: ' + portData.currentStock,
            code: 'insufficientStock'
        };
    } else if (amount * portData.price > user.profile.currency) {
        return {
            error: 'Not enough money. Required: $' + (amount * portData.price).toFixed(2) + ' | Current: $' + parseInt(user.profile.currency).toFixed(2),
            code: 'insufficientFunds'
        };
    } else if (portData.sell === 'fuel' && amount > (parseInt(user.profile.maxFuel) - parseInt(user.profile.fuel))) {
        return {
            error: 'Insufficient fuel capacity. Available fuel capacity: ' + (user.profile.maxFuel - user.profile.fuel),
            code: 'insufficientStock'
        };
    } else if (portData.sell !== 'fuel' && amount > user.profile.holds) {
        return {
            error: 'Insufficient available holds. Available holds: ' + user.profile.holds,
            code: 'insufficientHolds'
        };
    }
    else {
        return {
            error: false
        };
    }

    return { error: false };
}

function smartBuy(user, portData) {
    var amount = parseInt(portData.sell === 'fuel' ? (parseInt(user.profile.maxFuel) - parseInt(user.profile.fuel)) : user.profile.holds);

    if (amount === 0) {
        if (portData.sell === 'fuel') {
            return {
                error: 'Insufficient fuel capacity. Available fuel capacity: ' + (user.profile.maxFuel - user.profile.fuel),
                code: 'insufficientStock'
            };
        } else {
            return {
                error: 'Insufficient available holds. Available holds: ' + user.profile.holds,
                code: 'insufficientStock'
            };
        }
    }
    if (amount > portData.currentStock) {
        amount = parseInt(portData.currentStock);
        if (amount === 0) {
            return {
                error: 'Insufficient stock. Available stock: ' + portData.currentStock,
                code: 'insufficientStock'
            };
        }
    }
    if (amount * portData.price > user.profile.currency) {
        amount = Math.floor(user.profile.currency / portData.price);
        if (amount === 0) {
            return {
                error: 'Not enough money. Required: $' + (amount * portData.price).toFixed(2) + ' | Current: $' + parseInt(user.profile.currency).toFixed(2),
                code: 'insufficientFunds'
            };
        }
    }
    return amount;
}

function buildResponse(amount, portData, userParam) {
    var totalPrice = common.moneyFormat(parseInt(amount * portData.price));
    var response = 'Purchase successful!';
    response += '\n```';
    response += '\nPurchased ' + amount + ' ' + portData.sell + ' for $' + totalPrice;
    response += '\n```';
    return response;
}
